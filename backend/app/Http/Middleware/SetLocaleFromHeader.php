<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocaleFromHeader
{
    private const SUPPORTED = ['ar', 'en', 'fr', 'zh', 'ru', 'es', 'ur'];

    public function handle(Request $request, Closure $next)
    {
        $locale = $request->query('lang')
            ?? $this->parseHeader($request->header('Accept-Language', 'ar'));

        if (in_array($locale, self::SUPPORTED, true)) {
            app()->setLocale($locale);
        }

        return $next($request);
    }

    private function parseHeader(string $header): string
    {
        return substr(trim(explode(',', $header)[0]), 0, 2);
    }
}
