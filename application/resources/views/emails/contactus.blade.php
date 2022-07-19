@component('mail::message')
Hi Prashanth,

{{$payload['message']}}

Thanks,<br>
{{ $payload['name'] }}
@endcomponent
