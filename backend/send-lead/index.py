import json
import os
import urllib.request
import urllib.parse
import psycopg2

def handler(event: dict, context) -> dict:
    """Принимает заявку с формы, сохраняет в БД и отправляет в Telegram @vvviwww"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    raw_body = event.get('body') or '{}'
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        parsed = json.loads(raw_body)
        body = json.loads(parsed) if isinstance(parsed, str) else parsed
    name = str(body.get('name') or '').strip()
    phone = str(body.get('phone') or '').strip()
    subject = str(body.get('subject') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Имя и телефон обязательны'}
        }

    # Сохраняем в БД
    conn = psycopg2get_conn()
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO exam_leads (name, phone, subject) VALUES (%s, %s, %s)",
                (name, phone, subject or None)
            )
    conn.close()

    # Отправляем в Telegram
    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = '8299205085'
    text = (
        f"📚 *Новая заявка ExamCode*\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"📖 Предмет: {subject or 'не указан'}"
    )

    if token:
        try:
            params = urllib.parse.urlencode({
                'chat_id': chat_id,
                'text': text,
                'parse_mode': 'Markdown'
            }).encode()
            req = urllib.request.Request(
                f'https://api.telegram.org/bot{token}/sendMessage',
                data=params
            )
            urllib.request.urlopen(req, timeout=5)
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': {'ok': True}
    }


def psycopg2get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])