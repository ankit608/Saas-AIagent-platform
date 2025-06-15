import React from 'react'
import { parseAsInteger, parseAsString, useQueryState, useQueryStates, parseAsStringEnum} from 'nuqs'
import { DEFAULT_PAGE } from '@/constant'
import { MeetingStatus } from '../../types'

const UseMeeting = () => {
  return useQueryStates(
        {
            search: parseAsString.withDefault("").withOptions({clearOnDefault:true}),
            page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
            status: parseAsStringEnum(Object.values(MeetingStatus)),
            agentId: parseAsString.withDefault("").withOptions({clearOnDefault:true})
        }
  )
}

export default UseMeeting
