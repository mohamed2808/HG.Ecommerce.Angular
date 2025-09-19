import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductState } from '../models/ProductState';



const initialState: ProductState = {
  items: [],
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private _state = new BehaviorSubject<ProductState>(initialState);
  readonly state$ = this._state.asObservable();


  readonly items$ = this.state$.pipe(map(s => s.items));
  readonly loading$ = this.state$.pipe(map(s => s.loading));
  readonly error$ = this.state$.pipe(map(s => s.error));

  private setState(patch: Partial<ProductState>) {
    const cur = this._state.value;
    this._state.next({ ...cur, ...patch });
  }

  loadProducts(items: Product[]) {
    this.setState({ items, loading: false, error: null });
  }

  setLoading(loading = true) {
    this.setState({ loading });
  }

  setError(error: string|null) {
    this.setState({ error, loading: false });
  }

  clear() {
    this._state.next(initialState);
  }
}
