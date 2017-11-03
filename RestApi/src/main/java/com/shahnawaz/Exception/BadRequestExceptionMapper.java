package com.shahnawaz.Exception;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.shahnawaz.Model.ErrorMessage;

@Provider
public class BadRequestExceptionMapper implements ExceptionMapper<BadRequestException>{

	@Override
	public Response toResponse(BadRequestException exception) {
		
		ErrorMessage errorMessage = new ErrorMessage(exception.getMessage(), 400);
		
		return Response.status(Status.BAD_REQUEST)
				.entity(errorMessage)
				.type(MediaType.APPLICATION_JSON)
				.build();
	}
	
}
