import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1457406206602776741/A-dGhbpVt6HzwSNJVguZ1OLf-ngkyO1NkucsW_aE8p4sIa_b_CG93Cbf-FKjDZWf7ZMS'

async function sendDiscordNotification(name: string, phone: string, message: string) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('DISCORD_WEBHOOK_URL is not set')
    return
  }

  const now = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const embed = {
    embeds: [
      {
        title: '🌸 새로운 문의가 접수되었습니다!',
        color: 0x7c9a73,
        fields: [
          { name: '👤 이름', value: name, inline: true },
          { name: '📞 전화번호', value: phone, inline: true },
          { name: '💬 상담문의', value: message },
          { name: '🕐 접수시간', value: now },
        ],
        footer: {
          text: '아우라플라워 문의 알림',
        },
      },
    ],
  }

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(embed),
    })
  } catch (error) {
    console.error('Discord notification error:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          phone,
          message,
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '문의 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // Discord 알림 전송
    await sendDiscordNotification(name, phone, message)

    return NextResponse.json({ success: true, id: data?.[0]?.id })
  } catch (error) {
    console.error('Error saving inquiry:', error)
    return NextResponse.json(
      { error: '문의 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '문의 목록을 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: '문의 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID와 상태값이 필요합니다.' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '상태 업데이트 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: '상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID가 필요합니다.' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { error: '삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
