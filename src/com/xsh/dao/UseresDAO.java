package com.xsh.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.xsh.domain.Student;
import com.xsh.domain.Useres;

public class UseresDAO extends GenericHibernateDAO<Useres, Integer> {

	public UseresDAO() {
		
		super(Useres.class);
	
	}
	
	public List<Useres> getByStudent(Student student){
		Criteria criteria = getSession().createCriteria(Useres.class);
		criteria.add( Restrictions.eq("student", student) );
		
		return criteria.list();
	}
	
}
