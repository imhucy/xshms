package com.xsh.domain;

/**
 * RoleFunctions entity. @author MyEclipse Persistence Tools
 */

public class RoleFunctions implements java.io.Serializable {

	// Fields

	private Integer id;
	private Role role;
	private Functions functions;

	// Constructors

	/** default constructor */
	public RoleFunctions() {
	}

	/** full constructor */
	public RoleFunctions(Role role, Functions functions) {
		this.role = role;
		this.functions = functions;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Role getRole() {
		return this.role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Functions getFunctions() {
		return this.functions;
	}

	public void setFunctions(Functions functions) {
		this.functions = functions;
	}

}