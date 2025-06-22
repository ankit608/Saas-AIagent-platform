'use client'
import React, { useEffect, useState } from 'react'
import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { useTRPC } from '@/app/trpc/client'
import { useMutation } from '@tanstack/react-query'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { LoaderIcon } from 'lucide-react'
import CallUi from '@/modules/meetings/components/CallUi'

interface Props {
  meetingId: string,
  meetingName: string,
  userId: string,
  userName: string,
  userImage: string
}

const CallConnect = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
  const trpc = useTRPC()

  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generatedToken.mutationOptions()
  )

  const [client, setClient] = useState<StreamVideoClient>()
  const [call, setCall] = useState<Call>()

  // 1️⃣ Initialize StreamVideoClient
  useEffect(() => {
    if (typeof window === 'undefined') return

    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    })

    setClient(_client)

    return () => {
      _client.disconnectUser()
      setClient(undefined)
    }
  }, [userId, userName, userImage, generateToken])

  // 2️⃣ Join the call and disable camera/mic
  useEffect(() => {
    if (typeof window === 'undefined' || !client) return

    let _call: Call

    const initCall = async () => {
      _call = client.call("default", meetingId)
      await _call.join()
      await _call.camera.disable()
      await _call.microphone.disable()
      setCall(_call)
    }

    initCall()

    return () => {
      if (_call && _call.state.callingState !== CallingState.LEFT) {
        _call.leave()
        _call.endCall()
      }
      setCall(undefined)
    }
  }, [client, meetingId])

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent">
        <LoaderIcon className="animate-spin h-6 w-6 text-white" />
      </div>
    )
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUi meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  )
}

export default CallConnect
