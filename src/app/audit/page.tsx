import AppShell from '@/components/layout/AppShell'

const auditEvents = [
  { id: 1, actor: 'Д. Батболд', action: 'AI хариулт харсан', entity: 'case/c1', timestamp: '2026-05-31 09:35:12', type: 'view' },
  { id: 2, actor: 'Д. Батболд', action: 'Doctor decision: зөвшөөрсөн', entity: 'case/c1', timestamp: '2026-05-31 09:48:05', type: 'decision' },
  { id: 3, actor: 'Д. Батболд', action: 'Өвчтөн үүсгэсэн', entity: 'patient/p3', timestamp: '2026-05-31 11:00:22', type: 'create' },
  { id: 4, actor: 'Д. Батболд', action: 'AI шинжилгээ хүсэлт илгээсэн', entity: 'case/c2', timestamp: '2026-05-31 10:20:00', type: 'ai_request' },
  { id: 5, actor: 'А. Оюун (Admin)', action: 'Хэрэглэгч урилга илгээсэн', entity: 'user/new', timestamp: '2026-05-30 15:12:33', type: 'admin' },
  { id: 6, actor: 'Д. Батболд', action: 'Тохиолдол үүсгэсэн', entity: 'case/c1', timestamp: '2026-05-31 09:00:00', type: 'create' },
]

const typeColor: Record<string, string> = {
  view: 'bg-slate-100 text-slate-600',
  decision: 'bg-green-100 text-green-700',
  create: 'bg-blue-100 text-blue-700',
  ai_request: 'bg-indigo-100 text-indigo-700',
  admin: 'bg-purple-100 text-purple-700',
}

export default function AuditPage() {
  return (
    <AppShell>
      <div className="p-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
          <p className="text-slate-500 text-sm mt-0.5">Бүх системийн үйлдлийн бүртгэл — өөрчлөх боломжгүй</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
          <span className="text-amber-600 shrink-0">🔒</span>
          <p className="text-amber-800 text-sm">Audit log нь append-only байна. Аль ч хэрэглэгч устгах эсвэл засах боломжгүй.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <span className="font-semibold text-slate-900">Сүүлийн үйлдлүүд</span>
            <span className="text-slate-400 text-sm">{auditEvents.length} бүртгэл</span>
          </div>
          <div className="divide-y divide-slate-50">
            {auditEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-xs shrink-0">
                  {e.actor.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-slate-900 text-sm">{e.actor}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[e.type]}`}>
                      {e.action}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">{e.entity}</p>
                </div>
                <span className="text-slate-400 text-xs shrink-0 font-mono">{e.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
