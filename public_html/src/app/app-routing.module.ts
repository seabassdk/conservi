import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { RecipesComponent } from './recipes/recipes.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
//
// const appRoutes: Routes = [
//   { path: '', redirectTo: '/recipes', pathMatch: 'full' },
//   { path: 'recipes', component: RecipesComponent, children: [
//     { path: '', component: RecipeStartComponent },
//     { path: 'new', component: RecipeEditComponent },
//     { path: ':id', component: RecipeDetailComponent },
//     { path: ':id/edit', component: RecipeEditComponent },
//   ] },
//   { path: 'shopping-list', component: ShoppingListComponent },
// ];

import { MapComponent } from './map/map.component';
import { BackendComponent } from './backend/backend.component';

import { PropiedadesComponent } from './backend/propiedades/propiedades.component';
import { CorridaComponent } from './backend/corrida/corrida.component';
import { MainEditComponent } from './backend/corrida/main-edit/main-edit.component';
import { CabidaEditComponent } from './backend/corrida/cabida-edit/cabida-edit.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthGuard } from './auth/auth-guard.service';

  // { path: 'signup', component: SignupComponent},
const appRoutes: Routes = [
  { path: '',  component: MapComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'admin', component: BackendComponent, canActivate: [AuthGuard], children: [ //, canActivate: [AuthGuard]
    { path: 'corrida', component: CorridaComponent, canActivate: [AuthGuard], children: [ //, canActivate: [AuthGuard]
      {path: 'cabida', component: CabidaEditComponent, canActivate: [AuthGuard]} //, canActivate: [AuthGuard]
    ]},
    { path: 'propiedades', component: PropiedadesComponent, canActivate: [AuthGuard] } //, canActivate: [AuthGuard]
  ]},
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
