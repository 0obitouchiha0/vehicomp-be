const filterUser = (user) => {
  const {id, email, phone, firstname, lastname, middlename, role} = user
  return {id, email, phone, firstname, lastname, middlename, role}
}

module.exports = {filterUser}