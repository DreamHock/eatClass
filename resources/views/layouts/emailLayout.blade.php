<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    <title>Document</title>
</head>

<body class="font-sans antialiased text-slate-800">
    <div class="min-h-screen flex flex-col items-center bg-slate-100">
        <header>
            <a href="/" class="">
                <div>
                    <span class="text-8xl after:content-[''] after:inline-block after:bg-yellow-500 after:w-1.5 after:h-16 after:relative after:top-[0.5px]">eat</span>
                    <span class="text-4xl">class</span>
                </div>
            </a>
        </header>
        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg">
            @yield('content')
        </div>
    </div>
</body>

</html>