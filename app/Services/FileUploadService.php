<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class FileUploadService
{
    private string $disk = 'public';

    
    /**
     * @param mixed $uploadedFile
     * @param string $directory
     * @return bool|string|null
     */
    public function create(?UploadedFile $uploadedFile, string $directory): ?string
    {
        if (!$uploadedFile) {
            return null;
        }

        try {
            return $this->isImage($uploadedFile)
                ? $this->resize($uploadedFile, $directory)
                : Storage::disk($this->disk)->putFile($directory, $uploadedFile);
        } catch (\Throwable $e) {
            abort(500, 'Erreur lors du téléchargement du fichier : ' . $e->getMessage());
        }
    }

    /**
     * @param mixed $uploadedFile
     * @param string $directory
     * @param string $afterFile
     * @return bool|string
     */
    public function update(?UploadedFile $uploadedFile, string $directory, ?string $afterFile): ?string
    {
        try {

            if (null === $uploadedFile) {
                return null;
            }

            if (null === $afterFile) {
                return $this->create($uploadedFile, $directory);
            }

            if (Storage::disk($this->disk)->exists($afterFile)) {
                $this->delete($afterFile);
            }

            return $this->isImage($uploadedFile)
                ? $this->resize($uploadedFile, $directory)
                : Storage::disk($this->disk)->putFile($directory, $uploadedFile);
        } catch (\Throwable $e) {
            abort(500, 'Erreur lors du modification du fichier : ' . $e->getMessage());
        }
    }

    /**
     * @param string $path
     * @return bool
     */
    public function delete(?string $path): bool
    {
        if (null === $path) {
            return false;
        }

        try {
            return Storage::disk($this->disk)->delete($path);
        } catch (\Exception $e) {
            abort(500, 'Erreur lors de la suppression du fichier : ' . $e->getMessage());
        }
    }

    /**
     * @param \Illuminate\Http\UploadedFile $file
     * @return bool
     */
    private function isImage(UploadedFile $file): bool
    {
        return in_array(strtolower($file->getClientOriginalExtension()), ['png', 'jpg']);
    }

    /**
     * @param \Illuminate\Http\UploadedFile $upload
     * @param string $directory
     * @return string
     */
    private function resize(UploadedFile $upload, string $directory): string
    {
        $image = Image::read($upload)->resize(640, 480);

        $path = $directory . DIRECTORY_SEPARATOR . Str::random(100) . '.' . $upload->getClientOriginalExtension();
        $content =  $image->encodeByExtension($upload->getClientOriginalExtension(), quality: 90);

        if (!Storage::disk($this->disk)->put($path, $content)) {
            abort(500, "Une problème est survenue lors de la rédimensionnement de l'image, veullez changer d'image puis réessayer.");
        }

        return $path;
    }


    /**
     * @param string $disk
     * @return FileUploadService
     */
    public function setDisk(string $disk): static
    {
        $this->disk = $disk;

        return $this;
    }
}
