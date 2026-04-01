<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DigitalCertificateResource;
use App\Models\DigitalCertificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CertificateController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = DigitalCertificate::with('course');

        if ($request->filled('student_id')) {
            $query->where('student_id', $request->query('student_id'));
        }

        if ($request->filled('certificate_type')) {
            $query->where('certificate_type', $request->query('certificate_type'));
        }

        $certificates = $query->latest()->paginate($request->integer('per_page', 15));

        return DigitalCertificateResource::collection($certificates);
    }

    public function show(int $id): DigitalCertificateResource
    {
        $certificate = DigitalCertificate::with('course')->findOrFail($id);

        return new DigitalCertificateResource($certificate);
    }

    public function verify(string $certificateNumber): JsonResponse
    {
        $certificate = DigitalCertificate::where('certificate_number', $certificateNumber)
            ->with('course')
            ->first();

        if (! $certificate) {
            return response()->json([
                'valid' => false,
                'message' => 'Certificate not found.',
            ], 404);
        }

        $isExpired = $certificate->expires_at && $certificate->expires_at->isPast();

        return response()->json([
            'valid' => ! $isExpired,
            'expired' => $isExpired,
            'certificate' => new DigitalCertificateResource($certificate),
        ]);
    }
}
