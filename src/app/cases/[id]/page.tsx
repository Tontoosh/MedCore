'use client'
import { use, useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { mockCases } from '@/lib/mock-data'

const SECTIONS = ['Үндсэн мэдээлэл', 'Симптом', 'Амин үзүүлэлт', 'Лаборатори', 'Эм & Найрлага', 'Харшил']

export default function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const caseData = mockCases.find((c) => c.id === id) ?? mockCases[0]
  const [activeSection, setActiveSection] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      window.location.href = `/cases/${caseData.id}/ai-result`
    }, 2000)
  }

  return (
    <AppShell>
      <div className="p-8 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/dashboard" className="hover:text-slate-600">Хяналтын самбар</Link>
          <span>/</span>
          <span className="text-slate-700">{caseData.chiefComplaint}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{caseData.patientName}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{caseData.chiefComplaint}</p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
          >
            {analyzing ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI шинжилж байна...
              </>
            ) : '🧠 AI шинжилгээ хийх'}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Section nav */}
          <div className="w-44 shrink-0">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              {SECTIONS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(i)}
                  className={`w-full text-left px-4 py-3 text-sm border-b border-slate-50 last:border-0 transition ${
                    activeSection === i
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              {activeSection === 0 && <BasicInfoSection data={caseData} />}
              {activeSection === 1 && <SymptomsSection data={caseData} />}
              {activeSection === 2 && <VitalsSection />}
              {activeSection === 3 && <LabSection data={caseData} />}
              {activeSection === 4 && <MedSection data={caseData} />}
              {activeSection === 5 && <AllergySection />}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
              >
                ← Өмнөх
              </button>
              {activeSection < SECTIONS.length - 1 ? (
                <button
                  onClick={() => setActiveSection(activeSection + 1)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Дараах →
                </button>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60 transition"
                >
                  🧠 AI шинжилгээ хийх
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function BasicInfoSection({ data }: { data: ReturnType<typeof mockCases[0]['chiefComplaint']['charAt']> | any }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-900">Үндсэн мэдээлэл</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Гол зовиур</label>
          <textarea
            defaultValue={data.chiefComplaint}
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Эмчилгээний тэмдэглэл</label>
          <textarea
            placeholder="Нэмэлт тэмдэглэл..."
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Өвчний эхэлсэн огноо</label>
          <input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Хавсарсан өвчин</label>
          <input type="text" placeholder="ЧЭӨ, Чихрийн шижин..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>
    </div>
  )
}

function SymptomsSection({ data }: { data: any }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Симптомууд</h3>
        <button className="text-blue-600 text-sm hover:underline">+ Нэмэх</button>
      </div>
      <div className="space-y-3">
        {data.symptoms.map((s: any) => (
          <div key={s.id} className="border border-slate-100 rounded-lg p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-900 text-sm">{s.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                s.severity === 'severe' ? 'bg-red-100 text-red-600'
                : s.severity === 'moderate' ? 'bg-amber-100 text-amber-600'
                : 'bg-green-100 text-green-600'
              }`}>
                {s.severity === 'severe' ? 'Хүнд' : s.severity === 'moderate' ? 'Дунд' : 'Хөнгөн'}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>📅 {s.onsetDate}</span>
              <span>⏱ {s.duration}</span>
              {s.note && <span>📝 {s.note}</span>}
            </div>
          </div>
        ))}
        {data.symptoms.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
            Симптом нэмэгдээгүй байна
          </div>
        )}
      </div>
    </div>
  )
}

function VitalsSection() {
  const vitals = [
    { name: 'Цусны даралт', placeholder: '120/80', unit: 'mmHg' },
    { name: 'Пульс', placeholder: '72', unit: 'bpm' },
    { name: 'Халуун', placeholder: '36.6', unit: '°C' },
    { name: 'SpO2', placeholder: '98', unit: '%' },
    { name: 'Амьсгалын тоо', placeholder: '16', unit: '/мин' },
    { name: 'Жин', placeholder: '65', unit: 'кг' },
  ]
  return (
    <div>
      <h3 className="font-semibold text-slate-900 mb-4">Амин үзүүлэлт</h3>
      <div className="grid grid-cols-3 gap-4">
        {vitals.map((v) => (
          <div key={v.name}>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">{v.name}</label>
            <div className="flex">
              <input
                type="text"
                placeholder={v.placeholder}
                className="flex-1 border border-slate-200 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <span className="border border-l-0 border-slate-200 rounded-r-lg px-2.5 py-2 text-xs text-slate-400 bg-slate-50">{v.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LabSection({ data }: { data: any }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Лабораторийн хариу</h3>
        <button className="text-blue-600 text-sm hover:underline">+ Нэмэх</button>
      </div>
      {data.labResults.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">Шинжилгээ</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">Үр дүн</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">Хэвийн хязгаар</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">Огноо</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.labResults.map((l: any) => (
                <tr key={l.id} className={l.abnormalFlag ? 'bg-red-50' : ''}>
                  <td className="px-4 py-3 font-medium text-slate-900">{l.testName}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${l.abnormalFlag ? 'text-red-600' : 'text-green-600'}`}>
                      {l.value} {l.unit}
                    </span>
                    {l.abnormalFlag && <span className="ml-1 text-xs text-red-500">⚠</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{l.referenceRangeLow}–{l.referenceRangeHigh} {l.unit}</td>
                  <td className="px-4 py-3 text-slate-400">{l.collectedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
          Лабораторийн хариу нэмэгдээгүй
        </div>
      )}
    </div>
  )
}

function MedSection({ data }: { data: any }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Эм & Найрлага</h3>
        <button className="text-blue-600 text-sm hover:underline">+ Нэмэх</button>
      </div>
      <div className="space-y-3">
        {data.medications.map((m: any) => (
          <div key={m.id} className="border border-slate-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900 text-sm">{m.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {m.status === 'active' ? 'Идэвхтэй' : 'Зогссон'}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
              <span>💊 {m.dose}</span>
              <span>🔄 {m.frequency}</span>
              <span>📅 {m.startDate}-с</span>
            </div>
            {m.ingredients.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {m.ingredients.map((ing: string) => (
                  <span key={ing} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{ing}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {data.medications.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
            Эм нэмэгдээгүй байна
          </div>
        )}
      </div>
    </div>
  )
}

function AllergySection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Харшил</h3>
        <button className="text-blue-600 text-sm hover:underline">+ Нэмэх</button>
      </div>
      <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
        Бүртгэгдсэн харшил байхгүй
      </div>
    </div>
  )
}
