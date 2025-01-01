import QueryBuilder from '../../builder/QueryBuilder';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const AcademicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(academicFacultySearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await AcademicFacultyQuery.modelQuery;
  const meta = await AcademicFacultyQuery.countTotal();
  return {
    meta,
    result,
  };
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getSingleAcademicFacultyFromDB,
  getAllAcademicFacultiesFromDB,
  updateAcademicFacultyIntoDB,
};
