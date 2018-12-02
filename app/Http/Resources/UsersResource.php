<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class UsersResource
 * @package App\Http\Resources
 */
class UsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'        =>  $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'address'    => $this->address,
            'created_at' => Carbon::parse($this->created_at)->toDayDateTimeString(),
        ];
    }
}
