import prisma from '$lib/prisma';

export async function PATCH({ request, locals }) {
    const { id } = await request.json();

    if (!locals.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    await prisma.commit.update({
        where: { id: id },
        data: {
          statusInt: 2
        },
    });
    
    return new Response('ok', { status: 200 });
}
  
  