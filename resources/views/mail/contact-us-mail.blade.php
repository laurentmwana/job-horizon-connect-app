<x-mail::message>
# Nous contacter

## Salut {{ $data['name'] }},

Adresse : {{ $data['email'] }} <br />
Sujet : {{ $data['subject'] }} <br /> <br />
Message : <br />
{{ $data['message'] }}

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
