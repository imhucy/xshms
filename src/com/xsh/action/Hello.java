package com.xsh.action;

import java.util.Map;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;

public class Hello implements Action {

	private String message;
	public String execute() throws Exception {
		
		this.message = " Hello , World !";
		
		ActionContext context = ActionContext.getContext();
		
		Map session = context.getSession();
		
		session.put("message",	 message);
		return NONE;
	}

}
