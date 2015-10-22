package com.xsh.domain;

/**
 * Moral entity. @author MyEclipse Persistence Tools
 */

public class Moral implements java.io.Serializable {

	// Fields

	private Integer id;
	private Student student;
	private Integer addS;
	private Integer delS;
	private Integer teacherS;
	private Integer classmateS;
	private String term;

	// Constructors

	/** default constructor */
	public Moral() {
	}

	/** minimal constructor */
	public Moral(Student student, String term) {
		this.student = student;
		this.term = term;
	}

	/** full constructor */
	public Moral(Student student, Integer addS, Integer delS, Integer teacherS,
			Integer classmateS, String term) {
		this.student = student;
		this.addS = addS;
		this.delS = delS;
		this.teacherS = teacherS;
		this.classmateS = classmateS;
		this.term = term;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Student getStudent() {
		return this.student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Integer getAddS() {
		return this.addS;
	}

	public void setAddS(Integer addS) {
		this.addS = addS;
	}

	public Integer getDelS() {
		return this.delS;
	}

	public void setDelS(Integer delS) {
		this.delS = delS;
	}

	public Integer getTeacherS() {
		return this.teacherS;
	}

	public void setTeacherS(Integer teacherS) {
		this.teacherS = teacherS;
	}

	public Integer getClassmateS() {
		return this.classmateS;
	}

	public void setClassmateS(Integer classmateS) {
		this.classmateS = classmateS;
	}

	public String getTerm() {
		return this.term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

}