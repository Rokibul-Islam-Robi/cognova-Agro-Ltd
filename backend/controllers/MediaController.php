<?php
declare(strict_types=1);

namespace Prome\Controllers;

use Prome\Models\Media;
use Prome\Utils\Response;

class MediaController
{
    private Media $mediaModel;

    public function __construct()
    {
        $this->mediaModel = new Media();
    }

    public function index(): void
    {
        $category = $_GET['category'] ?? '';
        $media = $this->mediaModel->getAll($category);
        Response::success($media, 'Media gallery retrieved successfully.');
    }

    public function heroVideo(): void
    {
        $video = $this->mediaModel->getHeroVideo();
        if (!$video) {
            // High-def agricultural harvesting video fallback
            $video = [
                'title'       => 'Prome Agro Harvesting & Processing Video',
                'video_url'   => 'https://assets.mixkit.co/videos/preview/mixkit-tractor-harvesting-wheat-in-a-large-field-42567-large.mp4',
                'category'    => 'agro_farm',
                'description' => 'From fertile Bangladeshi agro fields to world-class food processing.'
            ];
        }
        Response::success($video);
    }
}
