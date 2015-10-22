package com.xsh.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.xsh.business.UserBiz;

public class Login2 extends HttpServlet {

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		UserBiz userBiz = new UserBiz();
		
		if ( userBiz.validateUser(username, password) ) {
			out.print("{\"msg\":\"登录成功\",\"login_status\":\"true\"}");
		}
		else{
			out.print("{\"msg\":\"用户名或密码错误\",\"login_status\":\"false\"}");
		}
		
		out.flush();
		out.close();
	}

}
/*
package com.xsh.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.xsh.business.UserBiz;

public class Login extends HttpServlet {

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		String student_id = request.getParameter("username");
		String password = request.getParameter("password");
		

        UserBiz userBiz = new UserBiz();
		if ( userBiz.validateUser(student_id, password) ){
			out.print("{\"msg\":\"登录成功\", \"login_status\" : true}");
		}

		out.flush();
		out.close();
	}

}

 * */
