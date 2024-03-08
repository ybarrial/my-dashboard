import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/req-response';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';

import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title title="User" />

    @if ( user() ) {
      <section>

        <img
          [srcset]="user()!.avatar"
          [alt]="user()!.first_name"
        />

        <div>
          <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
          <p>{{ user()?.email }}</p>
        </div>

      </section>

    } @else {
      <p>Cargando informacion</p>
    }

  `,
})
export default class UserComponent {

  private route = inject( ActivatedRoute );
  private usersService = inject( UsersService )

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) => this.usersService.getUserById( id ) )
    )
  )

  // constructor() {
  //   this.route.params.subscribe( params => {
  //     console.log({ params });
  //   })
  // }

}
