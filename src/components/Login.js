import { useEffect, useState } from "react";

const Login = () => {
  
  useEffect(() => {
    const insertUserData = async () => {
      try{
        const userData = { name: 'user@gmail.com', password: 'user'};
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err){
        alert("Somethings wrong with the server! please try again later.");
      }
    }
    insertUserData();
  },[])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{
      const storedUserData = await new Promise((res) => {
        const userData = localStorage.getItem('user');
        res(JSON.parse(userData));
      });
      if (storedUserData && email === storedUserData.name && password === storedUserData.password) {
        window.location.href = '/tracker';
      }
      else {
        alert('Invalid login credentials');
      }
    } catch (err){
      alert(err);
    }
  }

  return ( 
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Expense Tracker</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 text-base focus:outline-none focus:border-orange-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 text-base focus:outline-none focus:border-orange-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button onClick={ handleLogin } className="bg-orange-500 text-white rounded px-2 py-1">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Login;