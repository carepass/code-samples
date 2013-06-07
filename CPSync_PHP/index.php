<?php
session_start();
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/9/13
 * Time: 12:41 PM
 * To change this template use File | Settings | File Templates.
 */


require 'vendor/autoload.php';

use \Slim\Slim as Slim;
use \Slim\Extras\Views\Twig as TwigView;
use \OAuth2\Client\Provider\CarePass as CarePass;
use OAuth2\Client\Exception\IDPException as IDPException;

$app = new Slim(array(
    'view' => new TwigView(),
    'debug' => true
));

// Get request object
$req = $app->request();

$client = new CarePass(array(
    'clientId' => '2me8aqm3q5nqjtkus6yk4mxp',
    'clientSecret' => 'AkyAXqFptvSgFEVr9c9JUvH3',
    'redirectUri' => $req->getUrl() . $req->getResourceUri() . '/callback',
    'scopes' => array('IDENTITY','FAMILY','INSURANCE','LIFESTYLE','ACTIVITY','APPOINTMENT','FITNESS')
));


$app->get('/', function ()  use($app) {
    return $app->render('index.twig');
});

$app->get('/login', function ()  use($client) {
    $client->authorize();
});

$app->get('/callback', function () use($client, $app) {
    $auth_code = $app->request()->get('code');
    if (isset($auth_code)) {
        $access_token = $client->getAccessToken($grant = 'authorization_code', array(
            'code' => $auth_code,
            'response_type' => 'code'
        ));

        if(isset($access_token)) {
            $_SESSION['access_token'] = serialize($access_token);
            $app->redirect('user');
        }
    }
});

$app->get('/user', function ()  use($client, $app) {

    $access_token = $_SESSION['access_token'];
    if(isset($access_token)) {
        $token = unserialize($access_token);
        $user =  $client->getUserDetails($token);
        return $app->render('results.twig', $user);
    }

});

$app->get('/sample', function ()  use($app) {
    return $app->render('sample.twig', array(
        'name' => 'ferron smith',
        'date' => date('Y-m-d H:i:s')
    ));
});

$app->error(function (IDPException $e) use ($app) {
    $app->render('error.twig');
});


$app->run();