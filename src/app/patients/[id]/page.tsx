'use client'
import { use } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { mockPatients, mockCases } from '@/lib/mock-data'

export default function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const patient = mockPatients.find((p) => p.id === id) ?? mockPatients[0]
  const cases = mockCases.filter((c) => c.patientId === patient.id)

  return (
    <AppShell>
      <div className="p-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/patients" className="hover:text-slate-600 transition">Өвчтөнүүд</Link>
          <span>/</span>
          <span className="text-slate-700">{patient.name}</span>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0">
              {patient.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{patient.medicalRecordNo}</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                <span>📅 {patient.dateOfBirth}</span>
                <span>👤 {patient.age} нас · {patient.gender === 'male' ? 'Эр' : 'Эм'}</span>
                {patient.phone && <span>📞 {patient.phone}</span>}
                {patient.lastVisit && <span>🏥 Сүүлд: {patient.lastVisit}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Cases */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Тохиолдлууд</h2>
          <Link
            href="/cases/new"
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + Шинэ тохиолдол
          </Link>
        </div>

        {cases.length > 0 ? (
          <div className="space-y-3">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={c.status === 'ai_complete' ? `/cases/${c.id}/ai-result` : `/cases/${c.id}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-sm transition group"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{c.chiefComplaint}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{new Date(c.createdAt).toLocaleDateString('mn-MN')}</p>
                </div>
                {c.hasRedFlag && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">🚨 Яаралтай</span>}
                <span className="text-slate-300 group-hover:text-slate-500 transition">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
            <p className="text-slate-400 text-sm">Тохиолдол байхгүй байна</p>
            <Link href="/cases/new" className="text-blue-600 text-sm hover:underline mt-2 inline-block">Шинэ тохиолдол үүсгэх →</Link>
          </div>
        )}
      </div>
    </AppShell>
  )
}
