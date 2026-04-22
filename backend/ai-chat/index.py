import json
import os
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """AI-помощник ExamCode — отвечает на вопросы по ОГЭ/ЕГЭ и объясняет ошибки."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    raw_body = event.get('body') or '{}'
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        parsed = json.loads(raw_body)
        body = json.loads(parsed) if isinstance(parsed, str) else parsed

    message = str(body.get('message') or '').strip()
    history = body.get('history') or []

    if not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Сообщение не может быть пустым'},
        }

    api_key = os.environ.get('OPENAI_API_KEY', '')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'AI-помощник временно недоступен'},
        }

    system_prompt = (
        "Ты — AI-помощник образовательной платформы ExamCode для подготовки к ОГЭ и ЕГЭ. "
        "Помогаешь школьникам разобраться в ошибках и понять темы по математике, информатике, физике, русскому и английскому языку. "
        "Отвечай чётко, дружелюбно и по-русски. Объясняй просто, как умный старший товарищ. "
        "Если ученик допустил ошибку — объясни почему и покажи правильный подход шаг за шагом. "
        "Не пиши длинных лекций — только суть и пример."
    )

    messages = [{"role": "system", "content": system_prompt}]
    for h in history[-6:]:
        if h.get('role') in ('user', 'assistant') and h.get('content'):
            messages.append({"role": h['role'], "content": h['content']})
    messages.append({"role": "user", "content": message})

    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": messages,
        "max_tokens": 600,
        "temperature": 0.7,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    with urllib.request.urlopen(req, timeout=25) as resp:
        result = json.loads(resp.read())

    reply = result['choices'][0]['message']['content']

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'reply': reply},
    }
