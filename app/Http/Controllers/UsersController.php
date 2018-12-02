<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\User;
use Illuminate\Http\Request;

/**
 * Class UsersController
 * @property User user
 * @package App\Http\Controllers
 */
class UsersController extends Controller
{
    /**
     * @var User
     */
    protected $user;

    /**
     * UsersController constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * List of users in Json format
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $users = $this->user->all();

        return UsersResource::collection($users);
    }
}
