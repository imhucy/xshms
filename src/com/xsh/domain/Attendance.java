package com.xsh.domain;

import java.sql.Timestamp;

/**
 * Attendance entity. @author MyEclipse Persistence Tools
 */

public class Attendance implements java.io.Serializable {

	// Fields

	private Integer id;
	private Student studentByACheckman;
	private ScoreRule scoreRule;
	private Student studentByAStudent;
	private Term term;
	private Student studentByAAttendanceman;
	private Timestamp ACommitTime;
	private Short AState;
	private Integer AWeek;
	private Integer AWeekday;
	private Integer ALesson;
	private Integer AType;

	// Constructors

	/** default constructor */
	public Attendance() {
	}

	/** minimal constructor */
	public Attendance(ScoreRule scoreRule, Student studentByAStudent,
			Term term, Student studentByAAttendanceman, Timestamp ACommitTime) {
		this.scoreRule = scoreRule;
		this.studentByAStudent = studentByAStudent;
		this.term = term;
		this.studentByAAttendanceman = studentByAAttendanceman;
		this.ACommitTime = ACommitTime;
	}

	/** full constructor */
	public Attendance(Student studentByACheckman, ScoreRule scoreRule,
			Student studentByAStudent, Term term,
			Student studentByAAttendanceman, Timestamp ACommitTime,
			Short AState, Integer AWeek, Integer AWeekday, Integer ALesson,
			Integer AType) {
		this.studentByACheckman = studentByACheckman;
		this.scoreRule = scoreRule;
		this.studentByAStudent = studentByAStudent;
		this.term = term;
		this.studentByAAttendanceman = studentByAAttendanceman;
		this.ACommitTime = ACommitTime;
		this.AState = AState;
		this.AWeek = AWeek;
		this.AWeekday = AWeekday;
		this.ALesson = ALesson;
		this.AType = AType;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Student getStudentByACheckman() {
		return this.studentByACheckman;
	}

	public void setStudentByACheckman(Student studentByACheckman) {
		this.studentByACheckman = studentByACheckman;
	}

	public ScoreRule getScoreRule() {
		return this.scoreRule;
	}

	public void setScoreRule(ScoreRule scoreRule) {
		this.scoreRule = scoreRule;
	}

	public Student getStudentByAStudent() {
		return this.studentByAStudent;
	}

	public void setStudentByAStudent(Student studentByAStudent) {
		this.studentByAStudent = studentByAStudent;
	}

	public Term getTerm() {
		return this.term;
	}

	public void setTerm(Term term) {
		this.term = term;
	}

	public Student getStudentByAAttendanceman() {
		return this.studentByAAttendanceman;
	}

	public void setStudentByAAttendanceman(Student studentByAAttendanceman) {
		this.studentByAAttendanceman = studentByAAttendanceman;
	}

	public Timestamp getACommitTime() {
		return this.ACommitTime;
	}

	public void setACommitTime(Timestamp ACommitTime) {
		this.ACommitTime = ACommitTime;
	}

	public Short getAState() {
		return this.AState;
	}

	public void setAState(Short AState) {
		this.AState = AState;
	}

	public Integer getAWeek() {
		return this.AWeek;
	}

	public void setAWeek(Integer AWeek) {
		this.AWeek = AWeek;
	}

	public Integer getAWeekday() {
		return this.AWeekday;
	}

	public void setAWeekday(Integer AWeekday) {
		this.AWeekday = AWeekday;
	}

	public Integer getALesson() {
		return this.ALesson;
	}

	public void setALesson(Integer ALesson) {
		this.ALesson = ALesson;
	}

	public Integer getAType() {
		return this.AType;
	}

	public void setAType(Integer AType) {
		this.AType = AType;
	}

}