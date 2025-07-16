import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('auth');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${token}`,
      },
    });
  }
  return next(req);
};
