package com.bookstore.exception;

public class ErrorResponse {

    private int statusCode;
    private String message;


    public ErrorResponse(int value, String message) {
        super();
        this.statusCode=value;
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}