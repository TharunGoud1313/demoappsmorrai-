export const BASE_URL = process.env.NEXT_PUBLIC_POSTGREST_URL!;
const AMOGAAGENTS_URL = process.env.NEXT_PUBLIC_AMOGAAGENTS_URL!;

export const CREATE_USER_API =
  "https://us4okg8.219.93.129.146.sslip.io/contacts";

export const GET_CONTACTS_API = `${BASE_URL}/user_catalog`;
export const LOG_DATA = `${BASE_URL}/user_log`;
export const GET_ONE_CONTACT_API = `${BASE_URL}/user_catalog?user_catalog_id=eq.`;
export const SAVE_FORM_DATA = `${BASE_URL}/form_setup`;
export const ADD_FORM_DATA = `${BASE_URL}/form_data`;
export const SAVE_FORM_FIELDS = `${BASE_URL}/form_fields`;
export const ADD_CONNECTIONS = `${BASE_URL}/form_connections`;
export const STORY_TEMPLATE = `${BASE_URL}/story_template`;
export const SAVE_DOC_TEMPLATE = `${BASE_URL}/mydocs`;
export const ADD_DOC_FIELDS = `${BASE_URL}/mydoc_fields`;
export const MY_DOC_LIST = `${BASE_URL}/mydoc_list`;
export const MY_DOC_CONTENT = `${BASE_URL}/mydoc_content`;

export const PAGE_LIST = `${BASE_URL}/temp_pagelist`;

export const TEMPLATE_API = "https://nlg.morr.biz/templates";

export const TASKS_API = `${BASE_URL}/task`;
export const TASK_GROUP_API = `${BASE_URL}/task_group`;
export const PROJECTS_API = `${BASE_URL}/plan`;
export const PLAN_GROUP_API = `${BASE_URL}/plan_group`;
export const PLAN_API = `${BASE_URL}/plan`;
export const PLAN_PHASE_API = `${BASE_URL}/plan_phase`;
export const DOC_GROUP_API = `${BASE_URL}/doc_group`;
export const MESSAGES_API = `${BASE_URL}/msg`;
export const MSG_GROUP_API = `${BASE_URL}/msg_group`;

export const CHAT_SESSION_API = `${AMOGAAGENTS_URL}/Chat`;
export const CHAT_MESSAGE_API = `${AMOGAAGENTS_URL}/Message`;
export const CHAT_GROUP_API = `${AMOGAAGENTS_URL}/chat_group`;
export const LATEST_MESSAGE_API = `${AMOGAAGENTS_URL}/latest_message`;

export const EMAIL_LIST_API = `${BASE_URL}/email_list`;
export const CREATE_IMAP_DETAILS_URL = `${BASE_URL}/user_catalog_data`;
export const NEXT_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsInVzZXJfcm9sZSI6ImFkbWluIn0.vtqoLAwTFanOaPNrat56gnCbjh_ldfHcfuQqbmZKouE";
