package deltonphilipsoauth

class AuthController {

    def index = { 
		def code = params.code
		println code
		
		render  (view:"postAuth",model:[userAuthCode: code])
    }
}
