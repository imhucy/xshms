package com.xsh.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.xsh.business.UserBiz;

public class Login implements Action{

	private String username;
	
	private String password;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	private UserBiz userBiz;

	public UserBiz getUserBiz() {
		return userBiz;
	}

	public void setUserBiz(UserBiz userBiz) {
		this.userBiz = userBiz;
	}

	public String execute() throws Exception {
		
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request  = ServletActionContext.getRequest();

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		
		this.userBiz = new UserBiz();
		if ( this.userBiz.validateUser(username, password) ) {
			out.print("{\"msg\":\"登录成功\",\"login_status\":\"true\",\"user\":"+this.userBiz.getUserJSON()+"}");
		}
		else{
			out.print("{\"msg\":\"用户名或密码错误\",\"login_status\":\"false\"}");
		}
		
		out.flush();
		out.close();
		return NONE;
	}
	
}