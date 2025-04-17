import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaLock, FaFolder, FaMobileAlt } from 'react-icons/fa';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Secure File Storage and Sharing Made Simple
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Store, share, and access your files from anywhere with enterprise-grade security.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/register"
                    className="btn btn-primary text-center text-base font-medium px-8 py-3 hover:bg-blue-50 bg-white text-blue-600 rounded-full"
                  >
                    Get Started For Free
                  </Link>
                  <Link
                    to="/login"
                    className="btn bg-white text-blue-600 hover:bg-blue-50 text-center text-base font-medium px-8 py-3 rounded-full"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREBUQDxMVEBUVFRUVFxAVGA8VFRYVFRUWGBUVFRUZHSggGBslGxcVITEiJSkrLi4uFx8zODUtNygtLisBCgoKDg0OGxAQGy0lHyUwLTctLjAvNy0tLTAtLS0tKy0rLS0tLi0vLS0tLS0tNjUtLS0tMC0tLS0tLS4vLSstLf/AABEIAK0BIwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAQIDBwj/xABEEAABAwIDBQQGCAQFAwUAAAABAAIDBBEFITESQVFhcQYTIoEUMkKRodEjUmJygrHB8AcWsuGDkqKzwhUzQ0RTY2WT/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EADERAAICAQIDBQYGAwAAAAAAAAABAhEDBCESMVETQYGx8CIycZGh0QUUM1Jh4SPB8f/aAAwDAQACEQMRAD8A8NQhCAEIWbIDCFmyyGoDVC6BiyI0ByWbLsIlsIUBHsiylCBbCBARNlGypgp1sKdAQdlGwp/o6PRkBB2EbCn+jI9GQEDYRsKf6Mj0ZAL9lGyp/oyPR0BA2UbKnejrU06AhWRZTDAtTAgItlhSTCtTEgOCF1MawWIDmhbFqxZAYQs2WEAIQhACEIQGUALYNXVjEBzDVu2NSI4VKjpkBBbCujYE0jo1JjoUAnbTLq2lTyOg5KQzD+SAQNpF0bRqxMw7ku8eGXyspjFydIN0VuOgJNgCTwCZU/Zx59YhnLU/BWemo2sFmjqd5Xfu17OH8PxpXk3f0OWeaT90rrOzTN73HoGhb/y3H9Z3+n5J/wB2s7C6vy2D9qM+PJ1K1J2b+q/3j9Qok2Cvbq244jNXHulnullPQ4JclXwLLLNFH9A5I9A5K7RYQ6Z9omF54NBJ6m35pvD/AA/qnDNrI+Tni/8ApuvFzY+zm43dHVF2rKDH2eu0HbAuAbWO/wA1t/Ln2x7j81cDhD2+HI7OWR4Zb1xkpXN9YEfl717a0enr3fq/ucryZOpVf5b+2Pcfmsfy39se4/NWjukd0p/Jaf8Ab9X9yO0ydSrfy19se4/NYPZn7Y/yn5q090sd0n5LT/t+r+47TJ1KlUdndlpdtg2F7WOfxSp1Er7UQ3aRxySx2Gcl5muxY8ckoKjowyk17RUXUa5upFbXYbyXF+HclwmpU3Uq5OplaX4fyUeSg5ICtOp1ydCrFJQ8lFko0AjdGtCxNZKZRpIUBAIQu72LkWoDRCyhAd2NUyGJcYWpnSxIDpT0yZU9Eu1FTp9R0aAXQYdyU+HDOSe0tCmsGH8kBWosL5KVHhXJWmLD+SlR4fyQFVjwrktZaPZdbgP3+iujKDklGIUlpXeX9IXZoa7W/wCCk90IhTqZSYXtDaOm4KWKZWHC6cOjFtRkQu3WZZRx+yUjBXuIGYUBoLLoMM5K0CiUiDCi7M+EcT+gXjN3ubFO/wCjA5bOZ4Xv8FMHYuTZ27gf/GbBx89B5q8U9KyP1Rn9Y6/2WXrfHqMkOTKuKZBoKVsETYowBYC5HtO3k8c1iSQqS9q5mFZNtu2WFopIibmKM89hnyUmKhh3wxf5I/kpHcLdsat2kurIpCiv7KU8niia2J3AAbB8vZ8vcq7W4D3V+8YGge1YEHod6vzVXMar++Ow3/tj/UePTgtcMZ5JVboh0ikyQAm4AA4LX0dPZKIat9yZ4Zgpb45BY7mncOJ5r1MmaOKHkZcFsrsWEkC7hnw4clh2F8lcjRLm6hXi5JynLikbJUUt+F8lHkwvkrw6h5Li+g5KhJRZMK5KJLhfJX2TD+Siy4fyQFAmwzkl8+Hcl6DPh/JK6qhQFAqKJLKimV3rKNIa2nQFVmiUSRqc1USWTNQEOyFuQhATacJxRNSanKcUb0BZMPYrHQxqs0EqsdDMgLFSRpvTxhJKScJtBUBAM4owpUcYUGKoCksqEBMbGEvxmivaQbsj+h/fJTGVAXaOTayA2r7lfHNwlxIFYES7QNc03YS08R+vFPJsD9ppH3PkVClhLcnAhelHNGaIokUuKFvrtD+eh+SYx4zE7W7Oov8AkkJWqzlgxvuJotcczXeq4O6EFbbKqYU6mxR7cneMc9fIrCema91gfbCjtetoKprxdp+Y6pJX4vFCLyPAO5ozcejQs8WKU3wpbgdOkHRdIhcKtUfaWCUhucTtNmTw7XMG9vK6f0kvh8yrZsMse0lQF+O1JH0Tcri7jxB3JL3aaYuby+QUJdmBqMFQozQljXh0gLgNALa87qyQ1sUuQOfA5Hy4qsrIVcuOOTdiizyUvDNRzGFwwvETkx5vwcfyKZvaHcjxXBODg6YF7owuT4wu9S1zMzpxGn9lEfUBUBpJGFFljC6vqAo0tQEBFnjCU1cYTKonCUVc6AS10areIMVgrplXa+VAV+tak1QE3rXpRUFARCsIJQgO0LkxppUoY5SYpUBZ6OpTukrVS4KlMIKxAX2lxDmmcGJc15/DiHNTosS5oD0CLEualxYjfIe5IOzGA1VYA9o7qI/+d9wCPsN1f5Zc16LhmGU9IPANt++V9i78O5o6ed0Brh2GSOAdNeNv1fbPl7Pn7k5Y9kYswW/M9TvSqpxQcUrnxccVNAsclYFGfWqtOxEnesitU0B4/YdqB5ZfkuL6dvsm3XNLBWrYVqupyXJgkyNLdfeFyknDWlx0AJPktPTEtxCa8Ug+w/8ApK6sE+OSiybOb8dlN2xHuRvtm89OHkpmD9kpp7SSO7ljs9q7ZJnDjfNrfiqo1paG5g3AIa6w3A5G+WvLzTPDccmgd9G5zTvjdv63yPmAeC93Lp5RhWCk/XrezJOy14h2IsL00hPGKa7mno/Vp945JTSVdRTEsN2bBsYZC17PwPBuPhzC51vauomFi4RN3htwT5XLj7wFBp2Odm0XsWNL3WyLz4bN0F7Xyv1XNjw5eCs7TXrv9M3h/JdcOxXvmbWyWWtcHnoQd41Ug1CrGHPMfegm5EgaTxLe8F/gpRrV4upxxhlcY8v6Iklew2mDHbgDxGSWSGxsuRrVFqKq5UYptOiEThNZPabELtBPBU41K7RVtgM1bNuiWXeOrBUSsw1smcR2HcPZPy8vcq1Fi1tSmVNiw4rmoqKcRkkhdsytLTuO49DoUtlxLmrx6THKwslaHtOrXZjryPNVLtB2LeQZKB23v9HeQHfgecj0dbqVAE0+Jc0rqsQ5pJXVT43mORro3tNnMcC1w6g5pbPiHNANautSSsqVFnrEvnqUAVMqXSuW8sqjPcgNSULUlCAwCujXris3QEpkq7sqEvDl6/8Aw6/hVHNDHW4m47EgD46VhLS5h9V0rxmARmGtsbEG40QFP7M4LV18nd0cTpLetJ6sTOb5DkOmZO4FeydmP4eUtGBJVuFZMM7EWgYfssPrnm7hcAKwurIqeMQ07GQxtybGwBrR5BV7Esc5qaBZ6jFNo7Ld5sBlruCr2J4qW3udDbUHNLcKZPVSbMTXFtxtOFrNad5Jy0zsdeCi9ocHqYTaRhIv4XAAhwF9CPWPLXkujsJVf07/AJcyE75BNipdvXD0pJhMthMs1sSOW1a3FYkrJSTYXJOgGZPQJzR4U45ynZ+yNfM7v3otYYnkdRRDaOgrFsKxdZ8FDheI7J+q65afPUH3+SR1IfG7ZkaWHgd/MHQjmFGTDLG6kSN/TVo+ou1w+w/+gpP6QukE1yR9l/8AQ5XwOskfivMN7G07jkNwa3hvY2/5BdKYEgggloDs7XDTsuc2x9m5aetiuDZdzhtD3EdHfO4UiBwF9l/hIddpyN9hwblo7M245nIL66WyowxuyVhUYcZLi9oZXDkQwkHyT1jrbV//AK7/AGAq9h9RsF2V9qN8fC223Zv5XU+JkkpzyyYCBkLRMDGkjiGjfxK5M0bk2+X9p/6OmrZJqqgDvSDcGYkEbxeQgqH6ZzXHEnbMX+I0f6XpT6Qvn9Yl2z8PJEyVMdGsXM1SUekLHfrnTSINcW7QvgmaGBr27N3McLh1zxHiactQRrvTGhxmOdm3HtsIsHRPBNj9iQDZeOuyeW9UbFJtuV55292X6K9QPDWBrMm2FgNLbsl7MNHDJCPEtysXxd5KjDncvdf3KYKOVrS5u72TkT0XU4I9rfpJI43ucGsiJuXO2QdkuFww5geK2a4xVrnNMbrhzQbX1Ib6zTzGZ8iOCzlpMUo/4ztxdg/Zl8zFJjdjYmyf0GNXtmqFi2Ttob9ev7/Ja4dVSF4awF2YFhcm50AA1PILzJ4JRydn3nLNKLZ6VjOF0tfEG1cYdl4ZWkCVmfsuGYF9xyO8FeSdr/4a1lKDLS3rYBndg+mYPtxD1vvN55Belf8AT6yOISOiJGp2SXPAsLbUfAcrniFJw7GrWzVMmFxV/wBlD5lfUXXB8q+j+1fYWgxQGQj0aoP/AKmMDxG2Xes0k65Oy1Xztj2Ey0dTJS1AAkidsmxu03ALXNO8FpBHIrEERz1zJWLrCAyhYQgBCEIAX03LjrHRMdGfAWNLbabJaC34WXzIrLgPaiSFghfd8Y0b7Tb5nZO8a5H3hWjRDPUsRxi+iSy1Bcc724XUOirY5htRuDuI0cPvA5hSLK1UQNMLxmSB+3C90Z5aEDc5udx713xPtJNK7ae8vO4nJo+63K3w531SSyxZdv52fDVK+V1vREY8PIwSOHxRtIsiy4yxYuz8zGtHg8R1eLF2biLW9a2Q0yzF7XF3YcCAQQQdCMwehSHDCRA3baHR3Oo0O067toZt9nO1tcxvkxsddz6eTbzJdG4gm98ze9ndQfMr6LT412MWttvA5lJ8TQ8pys18sL43RyASZHhZpt621uI5cEsiErxeUiBm+2p5a38vgVPgk+jeIIzshrtp5sS4BpuBflu+AWefGuF3v5fM7sa2PPw9SKF/j/DJ/tuUMBSKD1/wyf7bl4+H9SPxXmYvkWSgwoPhEjSLuDgQ8Etycc2lvibYAcbk20S2elkjNpGlp47jbgRkVNoKOZsffQG5d7IIFix2pabh4txtmRa9l1rcULo3RSNs+zLkbQAIIcWua6xBGd9bnkvqVKfG6dq/FGOMjYa0mRoAuTlbqrBI3ZcQ8W0FgQG2H9rear2HE7YtkfP9E/p3c2uBba7vZt+tvisNT7x1xEePO+i/xR/S9INtPMf/AO1/ij+l6RQwue4MY0vcTYNaCXE8ABmV4Os/Wl4eSE+YbalYfQTVDiynjdK4C9m2sOG045N8yFcez38OXutJWksGogYRtnk5+jeg46hWlrRC3uYoxTsH/jaLX5uOrjz381hCPE9ip89VcD43ujla6N7TZzHgtcDzBzTrBcXbsiKQ2Iya46EbgTuO5evYxhlPWs7usjEthZsw8M0f3X6+RyNs15l2m/h1UU4MtKTWQjM7I+mYPtxD1ureZsAvbxatX7Wz+hRQ7i1Ya2KsmPe+EujG14iHmRoteADJ5dYEtcNSbLhicm0fSmgsd3rmSNILfpG2cHbJJ2S4E3bc2IPELzOgxd8WXrs+qd33Tu6K2t7RSVUbQ6V8jWaNfq0kbzvNt5JXVDHc04vbp0+HruKZOKCt/MJoXPJudltzbnwXCOQxG1i03Bvnnb1SDu9yn4XO0St7wbTb2I66fFHaSdj3t2ABYEG3C4sPzXN+IR7NrNHaS/5RjHO55Oza2ZNm7W1DohE6Zzmjdo4jg59rkdSdc77l0WMOuL5Wy36JZZYeQASSABmSbAAcSdy8nNqXlXCkkv4XedkVSou2G41pmvJ/4u17J8SJYblkUbHn7YufgC0eS2xPtWIwW0xudO9Pqj7oPrHnp1VLlkLiXEkkm5JzJJ1JO8rklSDNEIQqEAhCEAIQhACEIQEimq3McHNJBGjgbEeatuE9qQbNn/8A0aP6mD8x7lSllptmMlZSaIo9Zie1wDmEOB0III96zZeb4bi74Tdri3jvafvN/XVXLDO0McthJaN3G/gPR27ofeVdNPkQNrIay5sMycrLeyNlSBjRVYis0ONxkSPV9ZxIzyOu8DTJ3GXeJ7siYHg5O0aeBtfw36796Tukv6+f2va8zv8ANZjlLcvWHA/pw/eq9rR6uPCoS5oyePe0WGKNjSDPJ3ztzGkkfv3ea3rMcDRsk2ysI2aDht/L4KvOqjazPAN5v4j+Ld5W81GU6rUQSau368DeM2lsc3x2NtdMxvB0K60Xr/hePMscAPfZakIAXk43U0+hDG1DicsOTTcD2HZgZ3y3jPPqmFdiUU0JGzsvFrAi51Fw19tLXJ0vdV9kxGR8Q5/of2F3YQ71TY/VNgfI6H4HkvpYZMOVqXJ+vW5jGLiTMO9cZ2555e5NnVQHPda1shpeyRtGzm47HW9/Jup/JaGtN9mJpudCRtOPRug+KjPKF22dCkkSscP0IvltSAgcQGuuRxtce9QcExOSlmE0R2TYg5XBBtcEcMgsseWm8jtq5BdHfb2rbnk5DrmRwCh2Xz2fIpZXJBu3Z63gHbaGezZrQvO+/gPQ7vNMcTrDcNMY2dxOpHFrhp5LxVhI0VhwPtTLB4HWkj3xPzH4T7JSCxt2tn07vAnYv7KcvbtRguA1BGY6HR37yWjS5pDhdvA5jqpuBdo6epAaw92//wBp1gfw7j5KF2i7SUsBIsJ5RlsNtYffdoOmZUqWRy4XH15EXQm7Q9i6XEA6SRvo0oBJrGBrWkjfMw2D+uR5gLzSLDPRtqHvGTWe496za2XZAAi4B0HvvrqrFjfaOapNnu8I0iblGOGW88ykrjfMq08vDDgT+y8fSJ3qjQErWy4V+IRwj6Q57mDNx8t3U2CqGMdpHyXa3wN+o05n7zv0HxWGTLOe+STZWMYx5IsOJ47FDdo+kePZByH3naDpmVTsUxmSY+N1xuYMmDoN55m6WySk66cNy0WDn0Jsy519VhCFQgEIQgBCEIAQhCAEIQgBCEIAW8UpbofLctEICxYP2ifHZt7t+o71fwn2fyVyw/FI5smnZd9Q6+XHy+C8rUinq3M5jh8juV1PqRR6zZFlUsG7UHJsl3jnbbHn7XnnzVqpalko2o3B35jqNQtFvyINiFiy6WRZSSc7Ist7IsgNQptC1hyf4c83WLgBlnbVRbKwdmMA9JkMfeMj2dbkFxG/u2e0OZyF1vgjN3JOkub6ENpbHCphjDQ9z2PL7u2GeuCcnbZI8OYvbPXIC6UOmNrNswHUNvn946nzyXoHafsm1kYlbKNlrQ3Zk7pjrAZBrmtAceRFzxVEq6UxuAJvcXHS5GY3HIpl4pRU7teu4tRFsiy6WRZc4NLIst7LNkJCOQjRYc4n5IdYC5yA1J0HVIsU7RsjBEdnH659UdBq796q/HLhq9hY3qJmxt2pHBo4n8gN55BVfF+1FvDF4B9Y2Lz0Gjep+CruI4w+V17kn6x/4jRoSwm+ZzWLn0FkiprHPJNznqbkk8yd6jIQsyAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIACZUGLvjINzl7Qyd/cdUtQpToHouE9pWvFpP87f+Td3krAxwcLtIIOhFiF45HIWm7SQeIT7Ce0TozmdnidWn7zf1C0U+pFHo1kWS7DsbjlA2iGE773aejvmmlloDEeRuRfkt2vLTcE63DhkQeNhoeYWLIst8GonhlcSsoqXMl1WKSSEOkkdK4CwJLjYcLnTy13lRJZC71s7aZAWHAckWRZWz6qWVVVLoWWxpZZst7KPWVjIhd5z3NGbj0H6rlJOtkuxDF44rj13D2QRYfedu/NV3G+1Jza07P2GnP8AE7d0HxVSqqx0mpsPqjT+6q5pcgO8Y7RukNr7Q+qMmDy9o8yq/LK5xu43WiFk23zAIQhQAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIDvS1b4zdp6jceoVqwTtSRZrjb7Djl+F27oqchWUmuQPYqLEI5dDY/VOR8uKl2XkFFikkeXrN+qd3Q7lZsOxmR7bguby2iR8VqppkF6suc8zGC73BvX9BvVQqsVkAuXOPIOLfyVaqsekd6oDL7/Wd7z8kc0gXLGO07WCzDs8zm4/dbu6n4Kk1+MPkJsS0HU3Jcerkve8k3cSSd5zK1WUptkghCFUAhCEAIQhACEIQAhCEAIQhACEIQAhCEB//2Q=="
                  alt="File storage illustration"
                  className="rounded-full m-auto shadow-xl  w-100"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose Zata?
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Our platform combines security, simplicity, and speed to give you the best file management experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaCloudUploadAlt className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Fast Upload</h3>
                <p className="text-gray-500">
                  Upload files of any size with our optimized cloud infrastructure.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaLock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Secure Storage</h3>
                <p className="text-gray-500">
                  All files are encrypted at rest and in transit for maximum security.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaFolder className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Easy Organization</h3>
                <p className="text-gray-500">
                  Organize your files with tags, folders, and smart search.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-blue-600 mb-4">
                  <FaMobileAlt className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Access Anywhere</h3>
                <p className="text-gray-500">
                  Access your files from any device with our responsive web app.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-blue-200">Create your free account today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
