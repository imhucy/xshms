package com.xsh.dao;

import com.xsh.domain.Student;

public class StudentDAO extends GenericHibernateDAO<Student, String> {

	public StudentDAO() {
		super(Student.class);
	}
	
}
