package com.xsh.domain;

import java.util.HashSet;
import java.util.Set;

/**
 * Role entity. @author MyEclipse Persistence Tools
 */

public class Role implements java.io.Serializable {

	// Fields

	private Integer roleId;
	private String roleName;
	private String roleDesc;
	private Set usereses = new HashSet(0);
	private Set roleFunctionses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Role() {
	}

	/** minimal constructor */
	public Role(String roleName, String roleDesc) {
		this.roleName = roleName;
		this.roleDesc = roleDesc;
	}

	/** full constructor */
	public Role(String roleName, String roleDesc, Set usereses,
			Set roleFunctionses) {
		this.roleName = roleName;
		this.roleDesc = roleDesc;
		this.usereses = usereses;
		this.roleFunctionses = roleFunctionses;
	}

	// Property accessors

	public Integer getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDesc() {
		return this.roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public Set getUsereses() {
		return this.usereses;
	}

	public void setUsereses(Set usereses) {
		this.usereses = usereses;
	}

	public Set getRoleFunctionses() {
		return this.roleFunctionses;
	}

	public void setRoleFunctionses(Set roleFunctionses) {
		this.roleFunctionses = roleFunctionses;
	}

}