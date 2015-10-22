package com.xsh.business;

import java.util.List;

import net.sf.json.JSONObject;

import com.xsh.dao.StudentDAO;
import com.xsh.dao.UseresDAO;
import com.xsh.domain.Student;
import com.xsh.domain.Useres;



public class UserBiz {
	private UseresDAO userDAO;
	private StudentDAO studentDAO;
	private String userJSON;
	
	public String getUserJSON(){
		return this.userJSON;
	}
	
	public UserBiz(){
		this.userDAO = new UseresDAO();
		this.studentDAO = new StudentDAO();
	}
	
	public void addUser(Useres user){
		if(user == null) return;
		
		int userName = user.getId();
		Useres u = userDAO.getById(userName);
		if(u != null){
			System.out.println("用户已经存在");
		}
		else{
			userDAO.makePersistent(user);
		}
	}
	
	public boolean validateUser(String student_id,String psw){

		Student stu = studentDAO.getById(student_id);
		Useres user = null;
		
		List<Useres> list = userDAO.getByStudent(stu);

		for(Useres t : list){
			user = t;
		}
	
		if (user != null) {
			if( user.getPsw().equals(psw) ){
				this.userJSON = JSONObject.fromObject(user).toString();
				return true;
			}
		}
		return false;
	}
	
}
/*
JsonConfig config=new JsonConfig();
config.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
config.setExcludes(new String[]{ 
		"department",
		"attendancesForAStudent",
		"attendancesForAAttendanceman",
		"attendancesForACheckman",
		"morals",
		"usereses",
		"student",
		"classes"});
config.registerJsonValueProcessor(Date.class, new JsonValueProcessor() {
    public Object processObjectValue(String arg0, Object arg1,JsonConfig arg2) {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Date d=(Date) arg1;
        return sdf.format(d);
    }
    public Object processArrayValue(Object arg0, JsonConfig arg1) {
        return null;
    }
});*/
