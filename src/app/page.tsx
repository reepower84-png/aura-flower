'use client'

import { useState } from 'react'

interface ServiceItem {
  icon: string
  title: string
  desc: string
  images: { src: string; label: string }[]
}

const services: ServiceItem[] = [
  {
    icon: '🎊',
    title: '축하화환',
    desc: '개업, 승진, 당선 등 축하의 마음을 전하세요',
    images: [
      { src: '/images/flowers/celebration/축하3단화환.jpg', label: '축하3단화환' },
      { src: '/images/flowers/celebration/축하3단고급화환.jpg', label: '축하3단고급화환' },
      { src: '/images/flowers/celebration/축하3단특대화환.jpg', label: '축하3단특대화환' },
      { src: '/images/flowers/celebration/축하3단특특대화환.jpg', label: '축하3단특특대화환' },
      { src: '/images/flowers/celebration/축하4단화환.jpg', label: '축하4단화환' },
      { src: '/images/flowers/celebration/축하쌀화환10kg.jpg', label: '축하쌀화환10kg' },
    ],
  },
  {
    icon: '🕯️',
    title: '근조화환',
    desc: '고인을 추모하는 진심 어린 조화',
    images: [
      { src: '/images/flowers/condolence/근조3단화환.jpg', label: '근조3단화환' },
      { src: '/images/flowers/condolence/근조3단고급화환.jpg', label: '근조3단고급화환' },
      { src: '/images/flowers/condolence/근조3단특대화환.jpg', label: '근조3단특대화환' },
      { src: '/images/flowers/condolence/근조3단특특대화환.jpg', label: '근조3단특특대화환' },
      { src: '/images/flowers/condolence/근조4단화환.jpg', label: '근조4단화환' },
      { src: '/images/flowers/condolence/근조쌀화환10kg.jpg', label: '근조쌀화환10kg' },
    ],
  },
  {
    icon: '💐',
    title: '꽃다발',
    desc: '사랑하는 사람에게 전하는 특별한 선물',
    images: [
      { src: '/images/flowers/bouquet/가든스윗피.jpg', label: '가든스윗피' },
      { src: '/images/flowers/bouquet/베이비파우더.jpg', label: '베이비파우더' },
      { src: '/images/flowers/bouquet/비비드블로섬.jpg', label: '비비드블로섬' },
      { src: '/images/flowers/bouquet/온리유.jpg', label: '온리유' },
      { src: '/images/flowers/bouquet/키스더레인.jpg', label: '키스더레인' },
      { src: '/images/flowers/bouquet/프레그런스.jpg', label: '프레그런스' },
    ],
  },
  {
    icon: '🧺',
    title: '꽃바구니',
    desc: '생일, 기념일에 어울리는 아름다운 꽃바구니',
    images: [
      { src: '/images/flowers/basket/감사와 존경 카네이션 바구니.jpg', label: '감사와 존경 카네이션 바구니' },
      { src: '/images/flowers/basket/돌체볼르 러브.jpg', label: '돌체볼르 러브' },
      { src: '/images/flowers/basket/비너스.jpg', label: '비너스' },
      { src: '/images/flowers/basket/파스텔 스노우.jpg', label: '파스텔 스노우' },
      { src: '/images/flowers/basket/폴린러브.jpg', label: '폴린러브' },
      { src: '/images/flowers/basket/햇살 한가득.jpg', label: '햇살 한가득' },
    ],
  },
  {
    icon: '🌿',
    title: '관엽화분',
    desc: '공간에 생기를 더하는 싱그러운 관엽식물',
    images: [
      { src: '/images/flowers/foliage/고무나무.jpg', label: '고무나무' },
      { src: '/images/flowers/foliage/극락조.jpg', label: '극락조' },
      { src: '/images/flowers/foliage/녹보수.jpg', label: '녹보수' },
      { src: '/images/flowers/foliage/떡갈나무.jpg', label: '떡갈나무' },
      { src: '/images/flowers/foliage/산세베리아.jpg', label: '산세베리아' },
      { src: '/images/flowers/foliage/안스리움.jpg', label: '안스리움' },
    ],
  },
  {
    icon: '🌸',
    title: '동양란',
    desc: '품격 있는 동양란으로 감사의 마음을',
    images: [
      { src: '/images/flowers/oriental-orchid/금기.jpg', label: '금기' },
      { src: '/images/flowers/oriental-orchid/대국 청자.jpg', label: '대국 청자' },
      { src: '/images/flowers/oriental-orchid/산천보세.jpg', label: '산천보세' },
      { src: '/images/flowers/oriental-orchid/산천조.jpg', label: '산천조' },
      { src: '/images/flowers/oriental-orchid/철골소심.jpg', label: '철골소심' },
      { src: '/images/flowers/oriental-orchid/황룡금.jpg', label: '황룡금' },
    ],
  },
  {
    icon: '🌺',
    title: '서양란',
    desc: '화려하고 우아한 서양란 선물',
    images: [
      { src: '/images/flowers/western-orchid/만천홍.jpg', label: '만천홍' },
      { src: '/images/flowers/western-orchid/무늬 호접란.jpg', label: '무늬 호접란' },
      { src: '/images/flowers/western-orchid/살구향.jpg', label: '살구향' },
      { src: '/images/flowers/western-orchid/심비디움.jpg', label: '심비디움' },
      { src: '/images/flowers/western-orchid/연핑크 호접란.jpg', label: '연핑크 호접란' },
      { src: '/images/flowers/western-orchid/핑크 호접란.jpg', label: '핑크 호접란' },
    ],
  },
  {
    icon: '📦',
    title: '전국배송',
    desc: '전국 어디든 당일/익일 배송 가능',
    images: [],
  },
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">🌸</span>
              <span className="text-xl font-bold text-sage-800">아우라플라워</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-sage-700 hover:text-sage-900 font-medium transition-colors"
              >
                꽃배달 서비스
              </button>
              <button
                onClick={() => scrollToSection('collection')}
                className="text-sage-700 hover:text-sage-900 font-medium transition-colors"
              >
                화환수거
              </button>
              <button
                onClick={() => scrollToSection('startup')}
                className="text-sage-700 hover:text-sage-900 font-medium transition-colors"
              >
                창업지원
              </button>
              <button
                onClick={scrollToContact}
                className="bg-sage-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-sage-700 transition-colors"
              >
                상담 문의
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={scrollToContact}
              className="md:hidden bg-sage-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-sage-700 transition-colors"
            >
              상담 문의
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-cream-100 to-primary-50"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🌷</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🌹</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🌺</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🌻</div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <p className="text-sage-600 text-lg mb-4 font-medium">전국 꽃배달 & 플라워샵 창업 전문</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-sage-800">마음을 전하는</span>
            <br />
            <span className="gradient-text">아름다운 꽃 이야기</span>
          </h1>
          <p className="text-lg md:text-xl text-sage-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            축하와 위로의 순간, 아우라플라워가 함께합니다.
            <br />
            전국 어디서나 신선한 꽃을 빠르게 배달해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToContact} className="btn-primary">
              무료 상담 신청
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              창업 문의하기
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section - Flower Delivery */}
      <section className="py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-medium mb-2">FLOWER DELIVERY</p>
            <h2 className="section-title">전국 꽃배달 서비스</h2>
            <p className="section-subtitle">전국 어디든 빠르고 신선하게 배달해드립니다</p>
            <p className="text-sage-500 text-sm">※ 각 상품 클릭 시 이미지를 확인하실 수 있습니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-elegant p-6 text-center hover:transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  if (service.images.length > 0) {
                    setSelectedService(service)
                  } else {
                    scrollToContact()
                  }
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-sage-800 mb-2">{service.title}</h3>
                <p className="text-sage-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={scrollToContact} className="btn-primary">
              꽃배달 문의하기
            </button>
          </div>
        </div>
      </section>

      {/* Wreath Collection Service */}
      <section className="py-24 bg-gradient-to-br from-sage-50 to-cream-50" id="collection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-medium mb-2">WREATH COLLECTION</p>
              <h2 className="section-title">전국 화환수거 서비스</h2>
              <p className="text-sage-600 text-lg mb-8 leading-relaxed">
                행사가 끝난 후 화환 처리가 고민이시라면?
                <br />
                아우라플라워가 전국 어디서든 깔끔하게 수거해드립니다.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '전국 어디든 빠른 수거',
                  '친환경적인 처리 방식',
                  '합리적인 수거 비용',
                  '24시간 예약 가능',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-sage-600 text-white flex items-center justify-center text-sm">✓</span>
                    <span className="text-sage-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={scrollToContact} className="btn-primary">
                수거 서비스 문의
              </button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-6">🚚</div>
                  <h3 className="text-2xl font-bold text-sage-800 mb-2">빠른 수거</h3>
                  <p className="text-sage-600">전국 24시간 내 수거 완료</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-200 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-sage-200 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Support Section */}
      <section className="py-24 bg-sage-800 text-white" id="startup">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-300 font-medium mb-2">STARTUP SUPPORT</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">꽃배달 창업 지원</h2>
            <p className="text-sage-300 text-lg max-w-2xl mx-auto">
              꽃배달 사업을 시작하고 싶으신가요?
              <br />
              아우라플라워가 A부터 Z까지 도와드립니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌐',
                title: '홈페이지 제작',
                desc: '전문적인 꽃배달 홈페이지를 제작해드립니다. 주문 시스템, 결제 연동까지 완벽하게 구축해드립니다.',
              },
              {
                icon: '📞',
                title: '전화 대행 서비스',
                desc: '고객 전화를 대신 받아드립니다. 주문 접수부터 상담까지 전문 상담원이 처리합니다.',
              },
              {
                icon: '📚',
                title: '운영 교육 지원',
                desc: '꽃배달 사업 운영에 필요한 모든 노하우를 전수해드립니다. 성공적인 창업을 위한 맞춤 컨설팅을 제공합니다.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-sage-700/50 rounded-2xl p-8 hover:bg-sage-700 transition-colors">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sage-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToContact}
              className="bg-white text-sage-800 px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              창업 상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-medium mb-2">WHY CHOOSE US</p>
            <h2 className="section-title">왜 아우라플라워인가요?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: '년 업력', icon: '🏆' },
              { number: '50,000+', label: '배송 완료', icon: '📦' },
              { number: '전국', label: '네트워크', icon: '🗺️' },
              { number: '24시간', label: '상담 가능', icon: '⏰' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-sage-800 mb-2">{stat.number}</div>
                <div className="text-sage-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-cream-50 to-primary-50" id="contact">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary-600 font-medium mb-2">CONTACT US</p>
            <h2 className="section-title">상담 문의</h2>
            <p className="section-subtitle">
              무료 상담을 신청해주시면 빠르게 연락드리겠습니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all outline-none"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-sage-700 mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all outline-none"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sage-700 mb-2">
                  상담문의 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="문의하실 내용을 입력해주세요"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-center">
                  문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-center">
                  문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '접수 중...' : '무료 상담 신청하기'}
              </button>

              <a
                href="http://pf.kakao.com/_xaSxdaC/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-secondary block text-center"
              >
                카카오톡 실시간 상담하기
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-900 text-sage-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-3xl">🌸</span>
              <span className="text-2xl font-bold text-white">아우라플라워</span>
            </div>
            <div className="space-y-2 text-sm">
              <p>회사명: 제이코리아 | 대표자: 이주영</p>
              <p>사업자등록번호: 278-30-01540</p>
            </div>
            <div className="mt-8 pt-8 border-t border-sage-700 text-sm">
              <p>&copy; 2024 아우라플라워. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Kakao Button */}
      <a
        href="http://pf.kakao.com/_xaSxdaC/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
      >
        <img
          src="/카톡_원형_로고.png"
          alt="카카오톡 상담"
          className="w-full h-full rounded-full"
        />
      </a>

      {/* Image Gallery Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedService.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-sage-800">{selectedService.title}</h3>
                  <p className="text-sage-600 text-sm">{selectedService.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-10 h-10 rounded-full bg-sage-100 hover:bg-sage-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - Image Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedService.images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-sage-100 cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={image.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-medium">{image.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-sage-100 bg-sage-50">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSelectedService(null)
                    scrollToContact()
                  }}
                  className="btn-primary"
                >
                  {selectedService.title} 문의하기
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="btn-secondary"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
