# Automation Portal (deploy listo)

Sistema web dinámico para administrar automatizaciones (Hoja4) y recibir nuevas solicitudes.

## Stack
- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- Supabase (Postgres + Auth + RLS)

## 1) Crear proyecto en Supabase
1. Crea un proyecto en https://supabase.com
2. Ve a **SQL Editor** y ejecuta, en orden:
   - `supabase/01_schema.sql`
   - `supabase/02_rls.sql`
   - `supabase/03_seed.sql` (carga datos de tu Hoja4)

> Nota: `03_seed.sql` fue generado desde tu archivo `Reporte de automatizaciones 2025.xlsx` (Hoja4).

## 2) Variables de entorno
Crea un archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=TU_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
```

Las encuentras en Supabase → Project Settings → API.

## 3) Correr local
```bash
npm install
npm run dev
```
Abre: http://localhost:3000

## 4) Deploy a Vercel
1. Sube este repo a GitHub
2. Importa en Vercel
3. Agrega las mismas variables de entorno en Vercel
4. Deploy

## 5) Primer usuario ADMIN
Por seguridad, el primer usuario se crea como REQUESTER.
Para convertirlo en ADMIN:
1. Regístrate e inicia sesión (login por enlace mágico).
2. En Supabase → Table Editor → `profiles`, cambia `role_id` al id del rol ADMIN.
   - Tabla `roles`: busca el id donde `code='ADMIN'`.

## Rutas principales
- `/dashboard` KPIs
- `/requests` Bandeja de solicitudes
- `/requests/new` Crear solicitud
- `/projects` Tabla de proyectos (Hoja4)
- `/projects/kanban` Kanban drag & drop
- `/admin/users` Administración de usuarios (solo ADMIN)

## Próximo (Fase 2)
- SLA inteligente + alertas
- Semáforo de riesgo automático (por SLA + texto de riesgos)
- Reporte mensual PDF automático (cron)
- Adjuntos y comentarios por solicitud
