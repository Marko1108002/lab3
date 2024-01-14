import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import QuestionAnswer from "@/schemas/QuestionAnswer";

export const POST = routeHandler(async (request, context) => {
  const { questionId} = context.params;

  const body = await request.json();

  const validation = await QuestionAnswer.safeParseAsync(body);
  if (!validation.success) {
    throw validation.error;
  }

  const { data } = validation;
 const createdAnswer = await prisma.questionAnswer.create({
    data: {
      answer: data.answer,
      questionId: questionId,
    },
    include: {
      question: true,
    },
  });

  return createdAnswer;
});


export const GET = routeHandler(async (request, context) => {
  const { questionId } = context.params;
  const surveyQuestions = await prisma.questionAnswer.findMany({
    where: {
      questionId: questionId
    },
  });

  return surveyQuestions;
});

