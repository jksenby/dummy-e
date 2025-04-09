import { HttpInterceptorFn } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      var decodedToken: any = jwtDecode(token);
      var currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        var clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        return next(clonedReq);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      alert('Invalid Token')
      localStorage.removeItem("token"); // Remove if decoding fails
    }
  }

  return next(req);
};
