'use client'

import { useState, useEffect } from 'react'

interface Inquiry {
  id: string
  name: string
  phone: string
  message: string
  status: string
  created_at: string
}

const ADMIN_PASSWORD = 'aura2024!' // 실제 운영시 환경변수로 관리 권장

const STATUS_OPTIONS = [
  { value: 'pending', label: '대기중', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'contacted', label: '연락완료', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: '상담완료', color: 'bg-green-100 text-green-800' },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      sessionStorage.setItem('adminAuth', 'true')
    } else {
      setError('비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    setPassword('')
  }

  const fetchInquiries = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/inquiry')
      if (response.ok) {
        const data = await response.json()
        setInquiries(data)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/inquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (response.ok) {
        setInquiries(prev =>
          prev.map(inquiry =>
            inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
          )
        )
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/inquiry?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== id))
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error)
    }
  }

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries()
    }
  }, [isAuthenticated])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusStyle = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status)
    return option?.color || 'bg-gray-100 text-gray-800'
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-cream-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h1 className="text-2xl font-bold text-sage-800 mt-4">관리자 로그인</h1>
            <p className="text-sage-600 mt-2">아우라플라워 어드민</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-sage-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all outline-none"
                placeholder="관리자 비밀번호 입력"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-center text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-sage-600 text-white py-3 rounded-xl font-medium hover:bg-sage-700 transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sage-600 hover:text-sage-800 text-sm">
              ← 메인 페이지로 돌아가기
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span className="text-xl font-bold text-sage-800">아우라플라워 관리자</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchInquiries}
                className="text-sage-600 hover:text-sage-800 px-4 py-2 rounded-lg hover:bg-sage-50 transition-colors"
              >
                🔄 새로고침
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">문의 접수 현황</h2>
          <p className="text-gray-600 mt-1">총 {inquiries.length}건의 문의가 접수되었습니다.</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sage-200 border-t-sage-600"></div>
            <p className="text-gray-600 mt-4">로딩 중...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <span className="text-6xl">📭</span>
            <p className="text-gray-600 mt-4">아직 접수된 문의가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      접수일시
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      전화번호
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상담문의
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{inquiry.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-sm text-sage-600 hover:text-sage-800"
                        >
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 max-w-md">{inquiry.message}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.status || 'pending'}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          className={`text-sm font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer ${getStatusStyle(inquiry.status || 'pending')}`}
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          🗑️ 삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
