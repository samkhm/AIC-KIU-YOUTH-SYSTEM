Make this responsive too

return (
    <div className='border-l-2 rounded p-5 m-5 min-h-screen flex flex-col'>
      <div className='flex items-center justify-between gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10'>
        <h3 className='text-xl bold border-b-3 rounded p-2'>Sytem Users</h3>
      </div>

      <div className='flex flex-1 flex-row flex-wrap items-center justify-evenly gap-5
          bg-gray-200 
        w-full
        '>

        <div className='border-b p-2'>
          <h4 className='text-md italic'>Super Admins</h4>
          <div className="p-5">
            <SuperAdmins users={users} loadingUser={loadingUser}
              loadingUserUpdate={loadingUserUpdate} updateUser={updateUser} message={message} messageType={messageType}
              deleteUser={deleteUser} />
          </div>

        </div>

        <div className='border-b p-2'>
          <h4 className='text-md italic'>Admins</h4>
          <div className='p-5'>
            <Admins users={users} loadingUser={loadingUser}
              loadingUserUpdate={loadingUserUpdate} updateUser={updateUser} message={message} messageType={messageType}
              deleteUser={deleteUser} />
          </div>
        </div>

        <div className='border-b p-2'>
          <h4 className='text-md italic'>Registered Youths</h4>
          <div className='p-5'>
            <RegisteredYouths users={users} loadingUserUpdate={loadingUserUpdate} loadingUser={loadingUser}
              updateUser={updateUser} message={message} messageType={messageType} deleteUser={deleteUser}
              loadDelUser={loadDelUser} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full overflow-x-auto border-l-4 border-blue-400 rounded pl-2 sm:pl-4 max-h-[60vh] overflow-y-auto">
        <table className="min-w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-3 py-2 text-center">No.</th>
              <th className="px-2 sm:px-3 py-2 text-center">First Name</th>
              <th className="px-2 sm:px-3 py-2 text-center">Last Name</th>
              <th className="px-2 sm:px-3 py-2 text-center">Email</th>
              <th className="px-2 sm:px-3 py-2 text-center">Phone</th>
              <th className="px-2 sm:px-3 py-2 text-center">Role</th>
              <th className="px-2 sm:px-3 py-2 text-center">Status</th>
              <th className="px-2 sm:px-3 py-2 text-center">Edit</th>
              <th className="px-2 sm:px-3 py-2 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {loadingUser ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading admins...
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No admins found
                </td>
              </tr>
            ) : (
              admins.map((admin, index) => (
                <tr key={admin._id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.fname}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.lname}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.email}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">{admin.phone}</td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    <span className="px-2 py-1 rounded bg-yellow-200">{admin.role}</span>
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    <span className={`px-2 py-1 rounded ${admin.status ? 'bg-green-200' : 'bg-red-200'}`}>
                      {admin.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    {/* Edit dialog here */}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center">
                    {/* Delete button here */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  )


 return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full overflow-x-auto border-l-4 border-blue-400 rounded pl-2 sm:pl-4 max-h-[60vh] overflow-y-auto">
        <table className="min-w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-center">No.</th>
              <th className="px-3 py-2 text-center">First Name</th>
              <th className="px-3 py-2 text-center">Last Name</th>
              <th className="px-3 py-2 text-center">Email</th>
              <th className="px-3 py-2 text-center">Phone</th>
              <th className="px-3 py-2 text-center">Role</th>
              <th className="px-3 py-2 text-center">Status</th>
              <th className="px-3 py-2 text-center">Edit</th>
              <th className="px-3 py-2 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {loadingUser ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading users...
                </td>
              </tr>
            ) : reg_users.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No Registered Youths Found
                </td>
              </tr>
            ) : (
              reg_users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{user.fname}</td>
                  <td className="px-3 py-2 text-center">{user.lname}</td>
                  <td className="px-3 py-2 text-center">{user.email}</td>
                  <td className="px-3 py-2 text-center">{user.phone}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-white  ${user.role === "admin" ? "bg-blue-500" : "bg-yellow-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className="px-2 py-1 rounded bg-green-300">
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-3 py-2 text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => openEditDialog(user)}
                          className="hover:text-green-500"
                        >
                          <FaEdit size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="w-fit">
                        <DialogHeader>
                          <DialogTitle>Update User Info</DialogTitle>
                        </DialogHeader>

                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-3 mt-2"
                        >
                          {/* Frontend validation errors */}
                          {error && (
                            <p className="text-sm italic text-red-500">
                              {error}
                            </p>
                          )}

                          {/* Backend messages */}
                          {message && (
                            <p
                              className={`text-sm italic ${messageType === "success"
                                  ? "text-green-500"
                                  : messageType === "error"
                                    ? "text-red-500"
                                    : ""
                                }`}
                            >
                              {message}
                            </p>
                          )}

                          <input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            placeholder="First name"
                            className="border rounded px-2 py-1"
                          />

                          <input
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            placeholder="Last name"
                            className="border rounded px-2 py-1"
                          />

                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="border rounded px-2 py-1"
                          />

                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            className="border rounded px-2 py-1"
                          />

                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border rounded px-2 py-1"
                          >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            {
                              userRole === "moderator" && (

                                <option value="moderator">moderator</option>
                              )
                            }
                          </select>

                          <button
                            type="submit"
                            disabled={loadingUserUpdate}

                            className="border border-blue-500 text-blue-600 rounded py-1 hover:bg-green-200"
                          >
                            {loadingUserUpdate ? "Updating..." : "Update"}
                          </button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </td>

                  <td className="px-3 py-2 text-center cursor-pointer">
                    {loadDelUser === user._id ? (
                      <TailSpin height={15} width={15} ariaLabel="loading" />
                    ) : (
                      <FaTrash
                        size={18}
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-300"
                      />
                    )}


                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full overflow-x-auto border-l-4 border-blue-400 rounded pl-2 sm:pl-4 max-h-[60vh] overflow-y-auto">
        <table className="min-w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-center">No.</th>
              <th className="px-3 py-2 text-center">First Name</th>
              <th className="px-3 py-2 text-center">Last Name</th>
              <th className="px-3 py-2 text-center">Email</th>
              <th className="px-3 py-2 text-center">Phone</th>
              <th className="px-3 py-2 text-center">Role</th>
              <th className="px-3 py-2 text-center">Status</th>
              {
                userRole === "moderator" && (
                  <>
                    <th className="px-3 py-2 text-center">Edit</th>
                    <th className="px-3 py-2 text-center">Delete</th>
                  </>

                )
              }

            </tr>
          </thead>

          <tbody>
            {loadingUser ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading admins...
                </td>
              </tr>
            ) : superAdmin.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No super admins found
                </td>
              </tr>
            ) : (
              superAdmin.map((mod, index) => (
                <tr key={mod._id || index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{mod.fname}</td>
                  <td className="px-3 py-2 text-center">{mod.lname}</td>
                  <td className="px-3 py-2 text-center">{mod.email}</td>
                  <td className="px-3 py-2 text-center">{mod.phone}</td>
                  <td className="px-3 py-2 text-center">
                    <span className='bg-blue-500 p-1 rounded text-white'>
                      {mod.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className="px-2 py-1 rounded bg-green-200">
                      {mod.status === "true" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {
                    userRole === "moderator" && (
                      <>
                        <td className="px-3 py-2 text-center">

                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                onClick={() => openEditDialog(mod)}
                                className='hover:text-green-500'
                              >
                                <FaEdit size={18} />
                              </button>
                            </DialogTrigger>
                            <DialogContent className='w-fit'>
                              <DialogHeader>
                                <DialogTitle>Update User Info</DialogTitle>
                              </DialogHeader>
                              <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-3 mt-2"
                              >
                                {error && (
                                  <p className="text-sm italic text-red-500">
                                    {error}
                                  </p>
                                )}

                                {/* Backend messages */}
                                {message && (
                                  <p
                                    className={`text-sm italic ${messageType === "success"
                                      ? "text-green-500"
                                      : messageType === "error"
                                        ? "text-red-500"
                                        : ""
                                      }`}
                                  >
                                    {message}
                                  </p>
                                )}

                                <input
                                  type="text"
                                  value={fname}
                                  onChange={(e) => setFname(e.target.value)}
                                  placeholder="First name"
                                  className="border rounded px-2 py-1"
                                />

                                <input
                                  type="text"
                                  value={lname}
                                  onChange={(e) => setLname(e.target.value)}
                                  placeholder="Last name"
                                  className="border rounded px-2 py-1"
                                />

                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Email"
                                  className="border rounded px-2 py-1"
                                />

                                <input
                                  type="phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="Phone"
                                  className="border rounded px-2 py-1"
                                />


                                <select
                                  value={role}
                                  onChange={(e) => setRole(e.target.value)}
                                  className="border rounded px-2 py-1"
                                >
                                  <option value="user">user</option>
                                  <option value="admin">admin</option>
                                  <option value="moderator">moderator</option>
                                </select>


                                <button
                                  type="submit"
                                  disabled={loadingUserUpdate}
                                  className="border border-blue-500 text-blue-600 rounded py-1 hover:bg-green-200"
                                >
                                  {loadingUserUpdate ? "Updating..." : "Update"}
                                </button>
                              </form>
                            </DialogContent>
                          </Dialog>

                        </td>
                        <td className="px-3 py-2 text-center">
                          {loadDelUser === mod._id ? (
                            <TailSpin height={15} width={15} ariaLabel="loading" />
                          ) : (
                            <FaTrash
                              size={18}
                              onClick={() => deleteUser(mod._id)}
                              className="text-red-500 hover:text-red-300"
                            />
                          )}
                        </td>
                      </>
                    )
                  }


                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )