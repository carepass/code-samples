package deltonphilipsoauth

class Students {
	
	String firstName
	String lastName
	String middleName

    static constraints = {
		firstName(nullable:true)
		lastName(nullable:false, blank:true, size: 1..5)
    }
}
