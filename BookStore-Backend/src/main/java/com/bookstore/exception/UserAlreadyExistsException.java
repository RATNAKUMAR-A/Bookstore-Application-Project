package com.bookstore.exception;

public class UserAlreadyExistsException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;

    public UserAlreadyExistsException() {
    }

    public UserAlreadyExistsException(String msg) {
        super(msg);
        this.message = msg;
    }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
