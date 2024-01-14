import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";

export const DELETE = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;
  const response = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        delete: {
          id: questionId,
        },
      },
    },
    include: {
      questions: true,
    },
  });

  return response;
});

export const GET = routeHandler(async (request, context) => {
  const { questionId } = context.params;
  const question = await prisma.question.findUniqueOrThrow({
    where: {
      id: questionId,
    },
  });

  return question;
});
