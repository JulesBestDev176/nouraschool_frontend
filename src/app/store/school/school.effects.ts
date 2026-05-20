import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ClasseService } from '../../services/classe.service';
import { EleveService } from '../../services/eleve.service';
import { ParentService } from '../../services/parent.service';
import { TenantGuardService } from '../../services/tenant-guard.service';
import * as SchoolActions from './school.actions';

@Injectable()
export class SchoolEffects {
  loadReferenceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolActions.loadSchoolReferenceData),
      switchMap(() => {
        if (!this.tenantGuard.hasTenant()) {
          return of(SchoolActions.loadSchoolReferenceDataSuccess({ classes: [], parents: [] }));
        }
        return forkJoin({
          classes: this.classeService.listClasses(),
          parents: this.parentService.listParents(),
        }).pipe(
          map(({ classes, parents }) =>
            SchoolActions.loadSchoolReferenceDataSuccess({
              classes: classes.content ?? [],
              parents: parents.content ?? [],
            }),
          ),
          catchError((error) => of(SchoolActions.loadSchoolReferenceDataFailure({ error: this.toMessage(error) }))),
        );
      }),
    ),
  );

  loadEleves$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolActions.loadEleves),
      switchMap(({ page = 0, size = 20, classeId }) => {
        if (!this.tenantGuard.hasTenant()) {
          return of(SchoolActions.loadElevesSuccess({ eleves: [], totalElements: 0, page, size }));
        }
        return this.eleveService.listEleves(page, size, classeId).pipe(
          map((response) =>
            SchoolActions.loadElevesSuccess({
              eleves: response.content ?? [],
              totalElements: response.totalElements ?? response.content?.length ?? 0,
              page: response.page ?? page,
              size: response.size ?? size,
            }),
          ),
          catchError((error) => of(SchoolActions.loadElevesFailure({ error: this.toMessage(error) }))),
        );
      }),
    ),
  );

  createEleve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolActions.createEleve),
      mergeMap(({ eleve }) =>
        this.eleveService.createEleve(eleve).pipe(
          map((created) => SchoolActions.createEleveSuccess({ eleve: created })),
          catchError((error) => of(SchoolActions.createEleveFailure({ error: this.toMessage(error) }))),
        ),
      ),
    ),
  );

  updateEleve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolActions.updateEleve),
      mergeMap(({ id, changes }) =>
        this.eleveService.updateEleve(id, changes).pipe(
          map((updated) => SchoolActions.updateEleveSuccess({ eleve: updated })),
          catchError((error) => of(SchoolActions.updateEleveFailure({ error: this.toMessage(error) }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly classeService: ClasseService,
    private readonly eleveService: EleveService,
    private readonly parentService: ParentService,
    private readonly tenantGuard: TenantGuardService,
  ) {}

  private toMessage(error: unknown): string {
    const candidate = error as { error?: { message?: unknown }; message?: unknown };
    const message = candidate?.error?.message ?? candidate?.message;
    return Array.isArray(message) ? message.join(', ') : String(message ?? 'Une erreur est survenue');
  }
}
