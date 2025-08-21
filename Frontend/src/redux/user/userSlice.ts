import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Courses, Darja, Teacher, Events, studentMarks, teacherCourse, adminCourse } from '../../types'
import { api } from '../../api'
import { ClassTimetable } from '../../pages/timetable/timetableAlgorithms'

interface userState {
  darja: Darja[]
  course: Courses[]
  teacher: Teacher[]
  event: Events[]
  studentMarks: studentMarks[],
  teacherCourse: teacherCourse[],
  adminCourse: teacherCourse[],
  studentCourse: teacherCourse[],
  timetable: ClassTimetable[]
  loading: boolean;
  error: string;
  singleDarja: number
  username: string | null;
  role: string | null;
  _id: string | null;
}


const initialState: userState = {
  course: [],
  darja: [],
  teacher: [],
  event: [],
  studentMarks: [],
  teacherCourse: [],
  adminCourse: [],
  studentCourse: [],
  timetable: [],
  username: '',
  role: '',
  _id: '',
  loading: false,
  error: "",
  singleDarja: 0

}

export const getDarja = createAsyncThunk("user/getDarja", async () => {
  const response = await api.get(`/darja`);
  return response.data as Darja[];
});
export const getCourse = createAsyncThunk("user/getCourse", async (data: string) => {
  const response = await api.post(`/courses/coursebyadmin`, { admin: data });
  return response.data as Courses[];
});
export const getTeacher = createAsyncThunk("user/getTeacher", async () => {
  const response = await api.get(`/teacher`);
  return response.data as Teacher[];
});
export const getEvent = createAsyncThunk("user/getEvent", async () => {
  const response = await api.get(`/event`);
  return response.data as Events[];
});
export const getStudentMarks = createAsyncThunk("user/getMarks", async () => {
  const response = await api.get(`/marks`);
  return response.data as studentMarks[];
});
export const getTeacherCourse = createAsyncThunk("user/getTeacherCourse", async (data: string) => {
  const response = await api.post(`/teacher/getcourse`, { teacher: data });
  const mappedData = response.data.map((item: any) => ({
    _id: item._id,
    course: item.course,
    darja: item.darja.darjaID, // Extract `darjaID` from `darja`
    totalStudents: item.totalStudents,
    teacher: item.teacher.fullName, // Extract `fullName` from `teacher`
  }));
  return mappedData as teacherCourse[];
});

export const getAdminCourse = createAsyncThunk("user/getAdminCourse", async (data: string) => {
  const response = await api.post(`/admin/course`, { admin: data });
  const mappedData = response.data.map((item: any) => ({
    _id: item._id,
    course: item.course,
    darja: item.darja.darjaID, // Extract `darjaID` from `darja`
    totalStudents: item.totalStudents,
    teacher: item.teacher.fullName, // Extract `fullName` from `teacher`
  }));
  return mappedData as teacherCourse[];
});

export const getStudentCourse = createAsyncThunk("user/getStudentCourse", async (data: string) => {
  const response = await api.post(`/student/allcourse`, { username: data });
  const mappedData = response.data.map((item: any) => ({
    _id: item._id,
    course: item.course,
    darja: item.darja.darjaID, // Extract `darjaID` from `darja`
    totalStudents: item.totalStudents,
    teacher: item.teacher.fullName, // Extract `fullName` from `teacher`
  }));
  return mappedData as teacherCourse[];
});

export const getStudentMarksByDarja = createAsyncThunk("user/getMarksByDarja", async (course: string) => {
  const response = await api.post(`/marks/getmarks`, { course: course });
  const mappedData = response.data.map((item: any) => ({
    _id: item._id,
    username: item.username,
    fullname: item.fullname,
    // darja: item.darja.darjaID,
    marks: item.marks,
  }));
  return mappedData as studentMarks[];
});

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
    set_id: (state, action: PayloadAction<string | null>) => {
      state._id = action.payload;
    },
    setTimetable: (state, action: PayloadAction<ClassTimetable[]>) => {
      state.timetable = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDarja.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDarja.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.darja = payload;
      })
      .addCase(getDarja.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourse.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.course = payload;
      })
      .addCase(getCourse.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacher.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teacher = payload;
      })
      .addCase(getTeacher.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEvent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.event = payload;
      })
      .addCase(getEvent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getStudentMarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentMarks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.studentMarks = payload;
      })
      .addCase(getStudentMarks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getTeacherCourse.fulfilled, (state, action) => {
        state.teacherCourse = action.payload; // Store mapped data
      })
      .addCase(getStudentMarksByDarja.fulfilled, (state, action) => {
        state.studentMarks = action.payload; // Store mapped data
      })
      .addCase(getAdminCourse.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getAdminCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminCourse.fulfilled, (state, action) => {
        state.adminCourse = action.payload; // Store mapped data
      })
      .addCase(getStudentCourse.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getStudentCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentCourse.fulfilled, (state, action) => {
        state.studentCourse = action.payload; // Store mapped data
      })
  }
})

export const { setUsername, setRole, set_id, setTimetable } = userSlice.actions


export const selectCount = (state: RootState) => state.user

export const userReducer = userSlice.reducer