export default function StatusCode(code: number, produto?: string) {
    switch (code) {
        case 100:
            return {
                message: "Continue ou ignore",
                status: "warning"
            }
            break;
        case 101:
            return {
                message: "Etamos fazendo algumas alterações no sistema",
                status: "warning"
            }
            break;
        case 102:
            return {
                message: "Estamos processando sua resposta, mas não tempos nenhuma resposta",
                status: "warning"
            }
            break;
        case 200:
            return {
                message: (produto ? produto : "Requisição")+" feita com sucesso",
                status: "success"
            }
            break;
        case 201:
            return {
                message: (produto ? produto : "produto")+" criado com sucesso!",
                status: "success"
            }
            break;
        case 202:
            return {
                message: "Solicitação recebida",
                status: "success"
            }
            break;
        case 205:
            return {
                message: "Redefina seus dados",
                status: "success"
            }
            break
        case 300:
            return {
                message: "Mais de uma resposta recebida",
                status: "success"
            }
            break;
        case 400:
            return {
                message: "Não foi possivel acessar o servidor",
                status: "erro"
            }
            break;
        case 401:
            return {
                message: "Não autorizado",
                status: "erro"
            }
            break;
        case 404:
            return {
                message: (produto? produto : "N")+"ão encontrado",
                status: "erro"
            }
            break;
        case 500:
            return {
                message: "Sem acesso a internet",
                status: "erro"
            }

        default:
            return {
                message: "resposta não indentificada",
                status: "info"
            }
            break;
    }
}