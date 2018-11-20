<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	
	<title>Laravel</title>
	<link rel="stylesheet" href="{{ asset('css/app.css') }}"/>
</head>
<body>
<div class="flex-center position-ref full-height" id="app">
	<div class="container">
		<data-table
			fetch-url="{{ route('users.table') }}"
			:columns="['name', 'email', 'address' , 'created_at']"
		></data-table>
	</div>
</div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>